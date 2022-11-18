const express=require('express');
const bodyParser=require('body-parser');
const fs=require('fs');
const app=express();

app.use(bodyParser.urlencoded());

app.get('/',(req,res,next)=>{
    fs.readFile('username.txt',(err,data)=>{
        if(err){
            console.log(err)
            data="No Chat Exist"
        }
        res.send(
            `${data}<form action='/' method='POST' onsubmit='document.getElementById("uName").value=localStorage.getItem("username")'>
                <label for='uMsg'  >Type your message :</label>
                <input type='text' name='uMsg' id='uMsg' >
                <input type='hidden' name='uName' id='uName' > 
                <button type='submit'>Send</button>
            </form>`);
    })
    
});

app.post('/',(req, res)=>{
    fs.writeFile('username.txt',`${req.body.uName} : ${req.body.uMsg}`,{flag:'a'},(err)=>
        err ? console.log(err) : res.redirect('/')
    )
});

app.get('/login',(req,res,next)=>{
    res.send(`<form onsubmit=localStorage.setItem("username",document.getElementById("uName").value) 
    action="/" method="GET" >
        <label for="uName" >User Name :</label>
        <input type="text" name="uName" id="uName" >
        <button type="submit">Login</button>
    </form>`);
});

app.listen(3000);