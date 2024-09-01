const express = require("express");
const { books } = require("../data/books.json"); 
const router = express.Router();
const { users } = require("../data/users.json"); 

router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Got all the Books",
        data: books
    });
});


router.get("/issued",(req,res)=>{
    const userWiththeIssuedBook=users.filter((each)=>{
        if(each.issuedBook) return each;
    });
    const issuedBooks=[];
    userWiththeIssuedBook.forEach((each)=>{
        const book=books.find((book)=>(book.id=each.issuedBook));
        book.issuedBy=each.name;
        book.issuedDate=each.issuedDate;
        book.returnDate=each.returnDate;

        issuedBooks.push(book);

    });
    if(issuedBooks.length==0){
        return res.status(400).json({
            success:false,
            message:"No Book Have Been Issued Yet"
        });
    }
    return res.status(200).json({
        success:true,
        message:"Users with The Issued Book",
        data:issuedBooks,
    });
});

router.get("/:id",(req,res)=>{
    const {id} = req.params;
    const book = books.find((each) => each.id === id);
    if(!book){
         return res.status(200).json({
            success: false,
            message: " Book not found",
            });
        }
        return res.status(200).json({
            success:true,
            message:"Found the Book By Their ID",
            data:book,
        });
});

module.exports = router;
