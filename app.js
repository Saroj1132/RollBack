const express=require('express')
const app=express()
const db=require('./config/db')
const mongoose=require('mongoose')
const user=require('./model/user')
const deleteuser=require('./model/rollback_user')
const path=require('path')

mongoose.connect(db.url, (err, res)=>{
    console.log('Connection succesfully')
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res)=>{
    res.render("users")    
})

app.post('/', (req, res)=>{
    const {Name, Email}=req.body
    
    const tbluser=new user({
        Name:Name,
        Email:Email
    })
    tbluser.save()
    .then(user=>{
        res.redirect('/')
    })
})

app.get('/listuser', (req, res)=>{
    user.find()
    .exec()
    .then(doc=>{
        res.render("Listuser", {records:doc})
    })
})

app.get('/listuser/:id', (req, res)=>{
    user.findOne({_id:req.params.id})
    .exec()
    .then(doc=>{
        const tbldeleteuser=new deleteuser({
            Name:doc.Name,
            Email:doc.Email
        })
        tbldeleteuser.save()
        .then(adddeleteuser=>{
            user.findByIdAndDelete({_id:doc._id})
            .exec()
            .then(deleteuser=>{
                res.redirect('/listuser')
            })
        })
    })
})

app.get('/deleteuser', (req, res)=>{
    deleteuser.find()
    .exec()
    .then(doc=>{
        res.render("deleteduser", {records:doc})
    })
})

app.listen(3000)