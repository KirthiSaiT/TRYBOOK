const express = require('express');
const {users}=require('./data/users.json')
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(201).json({
        message: "THE SERVER IS UP AND RUNNING",
        data:"hey",
    });
});

app.get("/users",(req,res)=>{
    res.status(200).json({
        success:true,
        data:users
    })
})




app.get('*',(req,res)=>{
    res.status(404).json({
        message:" 404 PAGE NOT FOUND"
        });
})

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});
