const express =require("express");
const bodyParser=require("body-parser");
const ejs= require("ejs");
const mongoose= require("mongoose");  
const app=express();

var arr=[];

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://sourabhawasthy176022:sourabh3030@cluster0.ktmtuok.mongodb.net/firstDB",{useNewUrlParser: true});

const itemSchema= new mongoose.Schema({
    name: String
});
const  Item= mongoose.model("Item",itemSchema)

// const item1 =new Item({
//     name :"Welcome to your todolist"
// })
// const item2 =new Item({
//     name :"ADD by +"
// })
// const item3=new Item({
//     name:"jhj"
// })
// const defaultItems=[item1,item2,item3];

// Item.insertMany(defaultItems)
//       .then(function () {
//         console.log("Successfully saved defult items to DB");
//       })
//       .catch(function (err) {
//         console.log(err);
//       });

      app.get("/", function(req, res) {
        Item.find({})
          .then(items => {
            var currentdate = new Date(); 
            var datetime = currentdate.getDate() + "/"
                          + (currentdate.getMonth()+1)  + "/" 
                          + currentdate.getFullYear() + " @ "  
                          + currentdate.getHours() + ":"  
                          + currentdate.getMinutes() + ":" 
                          + currentdate.getSeconds();
      
            res.render("home", { day: datetime, arr: items });
          })
          .catch(err => {
            console.log(err);
          });
      });


      // app.get("/:customListName",function(req,res){
      //   const customListName=req.params.customListName;
      //   res.render("home",{day:customListName, arr:[] });

      // });
      
      app.post("/", function(req, res) {
        var item = req.body.newItem;
        var newItem = new Item({ name: item });
        
        newItem.save()
          .then(() => {
            res.redirect("/");
          })
          .catch(err => {
            console.log(err);
          });
      });
      app.post("/delete",function(req,res){
        const checkedItemId=req.body.checkbox;
        Item.findByIdAndRemove(checkedItemId).then(() => {
          res.redirect("/");
        })
        .catch(err => {
          console.log(err);
        });
        });
      

app.listen(3000,function(){
    console.log("start");
});