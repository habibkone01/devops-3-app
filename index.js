import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.end('Welcome to DevOps & CI-CD course !');
});

app.get("/health", (req, res) => {
    res.json({ status: "ok", version: "1.0.0" });
});

app.get("/users", (req, res) => {
    res.json([
        {
            name: 'John Doe',
            email: 'john.doe@exemple.com'
        }
    ]);
});

if (process.argv[1] === new URL(import.meta.url).pathname) {
    app.listen(port, () => {
        console.log(`App is listening on port ${port}`);
    });
}

export default app;
