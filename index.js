require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.59h5qtx.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const run = async () => {
    try {
        await client.connect();

        const db = client.db('todo');
        const taskCollection = db.collection('tasks');

        // app.get('/tasks', async (req, res) => {
        //     const cursor = taskCollection.find();
        //     const tasks = await cursor.toArray();
        //     res.send({ status: true, data: tasks });
        // });

        app.get('/tasks', async (req, res) => {
            let query = {};

            if (req.query.priority) {
                query.priority = req.query.priority;
            }
            
            const tasks = await taskCollection.find(query).sort({ isCompleted: 1, _id: -1 }).toArray();
            res.send({ status: true, data: tasks });
        });

        app.post('/task', async (req, res) => {
            const task = req.body;
            const result = await taskCollection.insertOne(task);
            res.send(result);
        });

        app.get('/task/:id', async (req, res) => {
            const id = req.params.id;
            const result = await taskCollection.findOne({ _id: new ObjectId(id) });
            res.send(result);
        });

        app.delete('/task/:id', async (req, res) => {
            const id = req.params.id;
            const result = await taskCollection.deleteOne({ _id: new ObjectId(id) });
            res.send(result);
        });

        app.put('/task/:id', async (req, res) => {
            const id = req.params.id;
            const task = req.body;
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    isCompleted: task.isCompleted,
                    title: task.title,
                    description: task.description,
                    priority: task.priority,
                },
            };

            const options = { upsert: true };
            const result = await taskCollection.updateOne(filter, updateDoc, options);

            if (task.isCompleted) {
                await taskCollection.deleteOne({ _id: new ObjectId(id) });
                const insertResult = await taskCollection.insertOne(task);
                return res.json(insertResult);
            } 

            res.json(result);
        });
    } finally {
        // await client.close();
    }
};

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Todo Server!');
});

app.listen(port, () => {
    console.log(`Todo server is running on port ${port}`);
});