const express = require("express")
const app = express()
const cors = require("cors")
const fs = require("fs")




app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    const data = JSON.parse(fs.readFileSync("./db.json","utf-8"))
    res.send(data)
})

app.post("/add",(req,res)=>{
    const data = JSON.parse(fs.readFileSync("./db.json","utf-8"))
    const userData = req.body
    userData.id = data.users.length + 1
    data.users.push(userData);
    fs.writeFileSync("./db.json",JSON.stringify(data,null,2))
    res.send({msg:"successfully registered"})

})

app.post("/login",(req,res)=>{
    try{
        const {email,password} = req.body

        const data = JSON.parse(fs.readFileSync("./db.json","utf-8"))
        const admin = data.admin.find(admin => admin.email === email && admin.password == password)

        if(admin){
            res.status(200).json({token:admin.token})
        }else{
            res.status(400).json({msg:"Invalid Credentials"})
        }

    }catch(error){
        res.send(error)
    }
})


app.listen(8000,()=>{
    console.log("server running on port 8000")
})