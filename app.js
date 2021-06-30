const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose=require("mongoose");
//var values=[];
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("extras"));
mongoose.connect("mongodb://localhost:27017/booksDB",{useNewUrlParser:true});
app.set('view engine', 'ejs');
const schema={
    val : String
};
const Book=mongoose.model("Book",schema);
 app.get("/",function(req,res)
 {
    var day =new Date();
     Book.find({},function(err,items_list)
     {
        res.render("list",{day : day,values : items_list});
     });
   
   // res.render("list",{day :day, values:values });
 });
 app.post("/", function(req,res)
 {
    var str=req.body.newItem;
    const data=new Book({
        val : str
    });
    data.save();
    //values.push(req.body.newItem);
     res.redirect("/");

 });
 app.post("/delete",function(req,res)
 {
     const id=req.body.checkbox;
     Book.findByIdAndDelete(id,function(err)
     {
         if(!err)
         {
             console.log("deleted the book name");
             res.redirect("/");
         }
     });
 });
 app.listen(3000,function()
 {
     console.log("Server started");
 });