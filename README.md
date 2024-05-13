# Todo-Server

## Installation:
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Create `.env` file to root and assign appropriate value.

    ```bash
    PORT=
    DB_USER=
    DB_PASS=
    ```
4. Run the server using `npm run dev`.

### Before Pushing Code:
Before pushing your code to the remote repository, ensure that you have run the following command in your terminal (Git Bash):

```bash
rm -rf .git
```

## Configuration:
- Environment Variables:
  - `PORT`: Port number the server listens on. Default: 3000
  - `DB_USER`: User MongoDB database.
  - `DB_PASS`: Password MongoDB database.

## Dependencies:
- `cors`: Express middleware for enabling CORS.
- `dotenv`: Loads environment variables from .env file.
- `express`: Web framework for Node.js.
- `mongodb`: MongoDB driver for Node.js.
- `nodemon`: Utility for automatically restarting the server during development.

## Server Link
Hosted in Vercel -> [todo-server](https://todo-server-two-rust.vercel.app)