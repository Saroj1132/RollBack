const mongoose=require('mongoose')

const mongooseschema=mongoose.Schema({
    Name:{
        type:String,
        require:true
    },
    Email:{
        type:String,
        require:true
    }
})

const user=mongoose.model('rollback',mongooseschema)

module.exports=user