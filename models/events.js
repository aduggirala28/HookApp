const mongoose = require('mongoose');
const config=require('../config/database');

//Event Schema
const EventSchema = mongoose.Schema({
headerkey: {
    type:String,
    required:true
},

event:{
    type:String,
    required:true
},

username:{
    type: String,
    required:true
}
});

const Event= module.exports=mongoose.model('Event',EventSchema);

module.exports.addEvent=function(newEvent,callback){
    newEvent.save(callback);
  //Event.create(newEvent,callback);
  
}

module.exports.getEventbyUsername=function(username,callback){
    Event.find({username:this.username},callback);
}