const express=require('express');
const mongoose=require('mongoose');

const app=express();
app.use(express.json());


//MONGODB connection
// mongoose.connect('mongodb//:localhost:27017/mynewdb',{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// },(err)=>{
//     if(!err){
//         console.log("connected to db")
//     }else{
//         console.log("Not Connected")
//     }
// });

// Previous code
// mongoose.connect('mongodb://localhost:27017/your-database', { useNewUrlParser: true }, () => {
//   console.log('Connected to the database');
// });

// Updated code
mongoose.connect('mongodb://localhost:27017/mynewdb', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to the db');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });


  //SCHEMA
const schema={
    name:String,
    email:String,
    id:Number
}
const monmodel=mongoose.model("NEWCOL",schema);



//POST
app.post('/post',async(req,res)=>{
    console.log("Inside Post Function");

    const data=new monmodel({
        name:req.body.name,
        email:req.body.email,
        id:req.body.id
    });
    const val=await data.save();
    res.json(val);
})

//READ or FETCH
app.get('/fetch/:id',(req,res)=>{
    fetchid=req.params.id;

    monmodel.findOne({id:fetchid})
    .then(val => {

        if (val) {
            res.send(val);
        } else {
            res.send("data doesnot exist");
        }
    
    })
    .catch(err => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
});


//FETCH ALL
app.get('/fetchAll',(req,res)=>{
    monmodel.find()
    .then(val=>{
        if(val){
            res.json(val);
        }else{
            res.send("Result doesnot exist");
        }
    })
    .catch(err=>{
        console.error("Error");
        res.status(500).send("Server doensit exist");
    });
})

//UPDATE or PUT
app.put('/update/:id',async(req,res)=>{
    let upid=req.params.id;
    let upname=req.body.name;
    let upemail=req.body.email;

    monmodel.findOneAndUpdate({id:upid},{$set:{name:upname,email:upemail}},
        {new:true})
        .then(val=>{
            if(val){
                res.send(val);
            }else{
                res.send("Data Not there")
            }
        })
        .catch(err=>{
            console.error(err);
    res.status(500).send('Internal Server Error');
        })
})

//DELETE
app.delete('/delete/:id',(req,res)=>{
    deid=req.params.id;
    
    monmodel.findOneAndDelete({id:deid})
    .then((val)=>{
        if(val){
            res.send(val);
        }else{
            res.send("No data with existing ID");
        }

    })
    .catch((err)=>{
        console.error(err);
        res.status(500).send('Internal Server Error');
    })
});

app.listen(3000,()=>{
    console.log("Conntecd to port")
})







