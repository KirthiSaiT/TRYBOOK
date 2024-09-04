const express = require('express');
const app = express();
const userRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const port = 4000;

app.use(express.json());


app.get('/', (req, res) => {
    res.status(200).json({
        message: "THE SERVER IS UP AND RUNNING",
        data: "hey",
    });
});


app.use("/users", userRouter);
app.use("/books", booksRouter); 


app.use('*', (req, res) => {
    res.status(404).json({
        message: "404 PAGE NOT FOUND"
    });
});


app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});
