const express= require ("express");
const app= express();

const port= 3030;
const path =require("path");
const {v4: uuidv4}=require('uuid');
const methodOverride=require("method-override");
 
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req, res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let{username, degree, email}=req.body;
    let id = uuidv4();
    posts.push({id,username,degree,email});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    // console.log(id);
    
    let post = posts.find((p) =>id === p.id);
    res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req, res)=>{
    let { id } = req.params;
    
    let newdegree = req. body. degree;
    let newemail = req.body. email;
    let post = posts.find((p) =>id === p.id);
    post.degree = newdegree;
    post.email =newemail;
    console.log(post);
    res.redirect("/posts");
    if(!post){
   return res.send("Post not found");
}

});

app.get("/posts/:id/edit",(req, res)=>{
     let { id } = req.params;
     let post = posts.find((p) =>id === p.id);
     res.render("edit.ejs",{ post });

});

app.delete("/posts/:id",(req, res)=>{
    let {id}=req.params;
    posts =posts.filter((p)=>id!==p.id);
    // res.send("delete success");
    res.redirect("/posts");
});


let posts=[
    {
        id:uuidv4(),
        username : "Manoj kumar jena",
        degree : "B.Tech , CST",
        email: "jenamanojkumar@gmail.com"
    },
    {
        id:uuidv4(),
        username : "rahul kumar sahu",
        degree : "B.Tech , CSE",
        email: "rahul123@gmail.com"
    },
    {
        id:uuidv4(),
        username : "neha mishra",
        degree : "B.Tech , CST",
        email: "neha@gmail.com"
    },
];
app.listen(port,()=>{
    console.log("listening to port: 3030");
});