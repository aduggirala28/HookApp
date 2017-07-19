const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config=require('../config/database');

var headersall=[]
//header Schema
const HeaderSchema = mongoose.Schema({
username:{
  type: String
},
allheaders: {
  type: Array,
  required:true
}
});

const Header= module.exports=mongoose.model('Header',HeaderSchema);

module.exports.addHeader=function(header,callback){
  const username=header.username;
  const query={username:username};
  const obj= Header.findOne(query);
  console.log(obj);
  Header.findOneAndUpdate(query,{allheaders:header.allheaders},{upsert:true, new: true},callback);
}