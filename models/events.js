<<<<<<< HEAD
const mongoose = require('mongoose');
const config=require('../config/database');

//Event Schema
const EventSchema = mongoose.Schema({
headerkey: {
    type:String,
    required:true
},

event:{
    linkdetail:{
        type:String,
        required:true
        },
    stringval:{
        type:String,
        required:true
    }
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
=======
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
>>>>>>> ce675d81f71a2ec4698b5ef88a0c52fc1fc307a0
}