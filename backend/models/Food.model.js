const mongoose = require('mongoose')

const foodSchema = mongoose.Schema({
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    subcategory:{
        type:String,
        enum:["breakfast","lunch","dinner"],
        required:true,
    },
    foodtype:{
        type:String,
        enum:["none","streetfood","southindian","pahadi"],
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now(),
    },
    available:{
        type:Boolean,
        default:true,
    }
})

const Food = mongoose.model("Food",foodSchema);
module.exports = Food;
