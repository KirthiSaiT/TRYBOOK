const express = require('express');
const {users}=require('./data/users.json')
const app = express();
const port = 3000;

app.use(express.json());

app.post('/', (req, res) => {
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
});

app.get('/users/:id', (req, res) => {
    const {id}=req.params;
    console.log(req.params);
    const user = users.find((each)=>each.id===id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User Doesn't Exist!!"
        });
    }
    return res.status(200).json({
        success: true,
        message: "User Found",
        data: user,
    });
    
});

app.post("/users",(req,res)=>{
    const{id,name,surname,email,subscriptionType,subscriptionDate}=req.body;

    const user=users.find((each)=>each.id===id);
    
    if(user){
        return res.status(404).json({
            success:false,
            message:"User with the ID Exsists",
        })
    }

    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate,
    });
    return res.status(201).json({
        success:true,
        message:"User Added",
        data:users,
    });
})

app.put("/users/:id",(req,res)=>{
    const {id}=req.params;
    const{data}=req.body;
    const user = users.find((each)=>each.id===id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User Doesn't Exist!!"
        });
    }
    const updateDate = users.map((each)=>{
        if(each.id===id){
            return {
                ...each,
                ...data,

            };
        }
        return each;
    });
    return res.status(200).json({
        success: true,
        message: "User Updated!!",
        data:updateDate,
    });
})


app.delete("/users/:id",(req,res)=>{
    const {id}=req.params;
    const user = users.find((each)=>each.id===id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User Doesn't Exist!!"
            });
        }
})



app.get('*',(req,res)=>{
    res.status(404).json({
        message:" 404 PAGE NOT FOUND"
        });
})

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});
