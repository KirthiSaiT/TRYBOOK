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

router.post("/",(req,res)=>{
    const {data}=req.body;
    if(!data){
        return res.status(400).json({
            success:"false",
            message:"No data to ADD a book"
        });
    }
    const book=books.find((each)=>each.id===data.id);
    if(book){
        return res.status(400).json({
            success:"false",
            message:"ID already Exists!"
        })
    }
    const allBooks={...books,data};
    return res.status(200).json({
        success:"true",
        message:"Book Added Successfully",
        data:allBooks,
    })
});
router.put("/updateBook/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    // Find the index of the book to update
    const bookIndex = books.findIndex((each) => each.id === id);

    if (bookIndex === -1) {
        return res.status(400).json({
            success: "false",
            message: "Book not found for the given ID"
        });
    }

    // Update the book data
    books[bookIndex] = { ...books[bookIndex], ...data };

    return res.status(200).json({
        success: "true",
        message: "Book Updated Successfully",
        data: books[bookIndex],
    });
});

router.get('/subscription-details/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((each) => each.id === id);

    if (!user) {
        return res.status(404).json({
            message: false,
            error: "User with ID does not exist" // Changed "message" to "error" for clarity
        });
    }

    const getDateInDays = (dateStr = '') => {
        let date;
        if (dateStr === '') {
            date = new Date();
        } else {
            date = new Date(dateStr);
        }
        return Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
    };

    const getSubscriptionEndDate = (subscriptionType, startDate) => {
        let endDate = new Date(startDate);

        if (subscriptionType === 'Basic') {
            endDate.setDate(endDate.getDate() + 30); // Assuming Basic subscription is 30 days
        } else if (subscriptionType === 'Standard') {
            endDate.setDate(endDate.getDate() + 60); // Assuming Standard subscription is 60 days
        } else if (subscriptionType === 'Premium') {
            endDate.setDate(endDate.getDate() + 90); // Assuming Premium subscription is 90 days
        } else {
            return null; // If subscriptionType is not recognized
        }

        return endDate;
    };

    const currentDate = new Date();
    const subscriptionEndDate = getSubscriptionEndDate(user.subscriptionType, currentDate);

    if (subscriptionEndDate) {
        res.json({
            message: true,
            subscriptionEndDate: subscriptionEndDate.toISOString()
        });
    } else {
        res.status(400).json({
            message: false,
            error: "Invalid subscription type"
        });
    }
});


module.exports = router;
