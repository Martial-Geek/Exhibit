const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();

mongoose.connect('mongodb://localhost:27017/booksDB', {
  useNewUrlParser: true
});

const bookSchema = {
    title: String,
    authorName: String
}

const Book = mongoose.model("Book", bookSchema);

const book1 = new Book({
    title: "Java Complete Edition",
    authorName: "S.L.Arora"
  });

// book1.save();

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    Book.find({}, function(err, foundBooks){
      res.render("libpage", {
        foundBooks : foundBooks
      });
      });
    });

app.listen(3000, function(){
    console.log("Server started on port 3000");
});