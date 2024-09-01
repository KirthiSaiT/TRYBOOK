const express=require("express");
const { users } = require('../data/users.json'); 
const router=express.Router();
router.get("/users",(req,res)=>{
    res.status(200).json({
        success:true,
        data:users
    })
});

router.get('/:id', (req, res) => {
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

router.post("/",(req,res)=>{
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

router.put("/:id",(req,res)=>{
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


router.delete("/:id",(req,res)=>{
    const {id}=req.params;
    const user = users.find((each)=>each.id===id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User Doesn't Exist!!"
            });
        }
        const index=users.indexOf(user);
        users.splice(index,1);

        return res.status(200).json({
            success:true,
            message:"Deleted user",
            data:users
        });
});

module.exports=router;