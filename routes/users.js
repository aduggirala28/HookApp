<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const User =require('../models/users');
const Event=require('../models/events');
const Header=require('../models/headers');
const passport=require('passport');
const jwt=require('jsonwebtoken');
const config=require('../config/database');
const request=require('request');


//register 
router.post('/register',(req,res,next)=>{
let newUser= new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser,(err,user)=>{
        if(err){
        res.json({success:false, msg:'Failed user registration'});
        }
        else{
            res.json({success:true,msg:'User Resgistered'});
        }

    });
});

//Authenticate
router.post('/authenticate',function(req,res,next){
const username=req.body.username;
const password=req.body.password;

User.getUserByUsername(username,(err,user)=>{
    if(err) throw err;
    if(!user){
        return res.json({success:false,msg:'User not Found!'});

    }
    User.comparePassword(password,user.password,(err,isMatch)=>{
        //isMatch boolean
        if(err) throw err;
        if(isMatch){
            const token = jwt.sign(user,config.secret,{
                expiresIn:3600 //one hour
            });
            res.json({success:true,
            token:'JWT '+token,
            user:{
            id:user._id,
            name:user.name,
            username:user.username,
            email:user.email
        }
    });
        }
        else{
            return res.json({success:false, msg:"Wrong password"});

        }
    });
});
});


//Profile
//passport.authenticate('jwt',{session:false}) --> protects the route
router.get('/profile', passport.authenticate('jwt',{session:false}), function(req,res, next){
res.json({user : req.user});
});

//eventlister get method -- get all the list of events related to a username. or of a username with a particular headerkey.
router.get('/eventlister', passport.authenticate('jwt',{session:false}),function(req,res,next){
const query_userkey=req.query.username;
const query_allsubmit=req.query.allsubmit;
console.log("The query_key is "+query_userkey);
console.log(query_allsubmit);
//Exclusively for Restcomm 

    Event.find({username:query_userkey},(err,event)=>{
    if(err)
    {
            throw err;
            console.log("NO EVENTS WERE FOUND");
        }
    console.log("All events of the user are "+event); 
    return res.json({list:event}) 
    });
});


//eventlister ---- need to Add post to backend API as well
router.post('/eventlister',passport.authenticate('jwt',{session:false}),function(req,res,next){
const query_userkey=req.query.username;
console.log("Username from allSubmti event"+query_userkey);
if(query_userkey!=undefined){

    Header.find({username:query_userkey},function(err,headerobj){
    if(err){
        throw err;
        console.log("Could not find the User's Headerlist");
    }
    else{
        const allheaderlist=headerobj[0].allheaders;
        var finalObj=Object;
        for(var i=0;i<allheaderlist.length;i++){
            var header=allheaderlist[i];
            var list0= Event.find({username:user,headerkey:header});
            var output="";
            for(var j=0;j<list0.length;j++){
                var num=""+(j+1);
                var str1=x.concat("."," ",list0[j].event,"     ");
                output=output.concat(str1);
            }
            finalObj[header]=output;
        }
        var options = {
            uri: 'localhost:3200/events',
            method: 'POST',
            json: {
                 "username":query_userkey,
                 "list": finalObj
                }
            };

         request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body.id) // Print the shortened url.
            }
            });
    }
        
    });


}

else {
    const event= new Event({
    headerkey:req.body.headerkey,
    event:req.body.event,
    username:req.body.username
    });
    // Event.create(event,function (err, data) {
    //    if (err) return handleError(err)});

    Event.addEvent(event,(err,event)=>{
            if(err){
            res.json({success:false, msg:'Failed event addition'});
            }
            else{
                res.json({success:true,msg:'Event added'});
            }

        });
}
});


//headers to get and to submit
router.get('/headers',function(req,res,next){
    const query_userkey=req.query.username;
    Header.findOne({username:query_userkey},(err,headerlist)=>{
        if(err) {
            console.log("Error in finding the allheader list");
            res.json({});
        }
        else{
            res.json(headerlist);
        }
    })
})




router.post('/headers', function(req,res,next){
    const header= new Header({
        username:req.body.username,
        allheaders:req.body.allheaders
    });
    
    Header.addHeader(header,(err,header)=>{
        if(err){
        res.json({success:false, msg:'Failed header addition'});
        }
        else{
            console.log('added headers  '+header);
            res.json({success:true,msg:'Headers added'});
        }

    });
})


function randomMethod(user){
Header.find({username:user},function(err,headerobj){
    if(err){

        throw err;
    }
    else{
        const allheaderlist=headerobj[0].allheaders;
        var finalObj=Object;
        for(var i=0;i<allheaderlist.length;i++){
            var header=allheaderlist[i];
            var list0= Event.find({username:user,headerkey:header});
            var output="";
            for(var j=0;j<list0.length;j++){
                var num=""+(j+1);
                var str1=x.concat("."," ",list0[j].event,"     ");
                output=output.concat(str1);
            }
            finalObj[header]=output;
        }
}
        
    });
}


=======
const express = require('express');
const router = express.Router();
const User =require('../models/users');
const Event=require('../models/events');
const Header=require('../models/headers');
const passport=require('passport');
const jwt=require('jsonwebtoken');
const config=require('../config/database')


//register 
router.post('/register',(req,res,next)=>{
let newUser= new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser,(err,user)=>{
        if(err){
        res.json({success:false, msg:'Failed user registration'});
        }
        else{
            res.json({success:true,msg:'User Resgistered'});
        }

    });
});

//Authenticate
router.post('/authenticate',function(req,res,next){
const username=req.body.username;
const password=req.body.password;

User.getUserByUsername(username,(err,user)=>{
    if(err) throw err;
    if(!user){
        return res.json({success:false,msg:'User not Found!'});

    }
    User.comparePassword(password,user.password,(err,isMatch)=>{
        //isMatch boolean
        if(err) throw err;
        if(isMatch){
            const token = jwt.sign(user,config.secret,{
                expiresIn:3600 //one hour
            });
            res.json({success:true,
            token:'JWT '+token,
            user:{
            id:user._id,
            name:user.name,
            username:user.username,
            email:user.email
        }
    });
        }
        else{
            return res.json({success:false, msg:"Wrong password"});

        }
    });
});
});


//Profile
//passport.authenticate('jwt',{session:false}) --> protects the route
router.get('/profile', passport.authenticate('jwt',{session:false}), function(req,res, next){
res.json({user : req.user});
});

//eventlister get method -- get all the list of events related to a username. or of a username with a particular headerkey.
router.get('/eventlister', passport.authenticate('jwt',{session:false}),function(req,res,next){
const query_userkey=req.query.username;
const query_headerkey=req.query.headerkey;
const query_id = req.query.id;

console.log("The query_key is "+query_userkey);
//console.log(query_id);

if(query_id!=undefined){
    Event.findByIdAndRemove(query_id, function(err, event){
        if(err){
            return res.json({success:false,msg:'Failed to delete'});
        }
        return res.json({success:true, msg:'success'});
    });

} else{

if(query_headerkey!=undefined && query_userkey!= undefined){
    Event.find({username:query_userkey, headerkey:query_headerkey},(err,event)=>{
    if(err)
    {
            throw err;
        }
    console.log("The event of user with the headerkey is "+event);
    return res.json({list:event}) 
    });
}
else if(query_headerkey!=undefined && query_userkey==undefined){
// delete event 
    Event.remove({headerkey:query_headerkey},function(err, event){
        if(err){
            return res.json({success:false,msg:'Failed to delete'});
        }
        return res.json({success:true, msg:'success'});
    });

} else{
    Event.find({username:query_userkey},(err,event)=>{
    if(err)
    {
            throw err;
        }
    console.log("All events of the user are "+event);
    return res.json({list:event}) 
    });
}
}
//  Event.getEventByUsername(query_key,(err,event)=>{
//       if(err) {
//           throw err;
//       }
//       if(!event){
//           return res.json({success:false, msg:"No events Found for the user "+query_key});
//      }
//      else{
//           console.log(event);
//          return res.json({list:event})
//      }
// }); 
});


//eventlister
router.post('/eventlister',passport.authenticate('jwt',{session:false}),function(req,res,next){
    const event= new Event({
        headerkey:req.body.headerkey,
        event:req.body.event,
        username:req.body.username
    });
// Event.create(event,function (err, data) {
//    if (err) return handleError(err)});

  Event.addEvent(event,(err,event)=>{
        if(err){
        res.json({success:false, msg:'Failed event addition'});
        }
        else{
            res.json({success:true,msg:'Event added'});
        }

    });
});


//headers to get and to submit
router.get('/headers',function(req,res,next){


    //const query_head=req.query.allheaders;

    //console.log("header:",query_head);
    const query_userkey=req.query.username;
    //console.log(query_userkey);
   
        Header.findOne({username:query_userkey},(err,headerlist)=>{
            if(err) {
                console.log("Error in finding the allheader list");
                res.json({});
            }
            else{
                res.json(headerlist);
            }
        })
    
})




router.post('/headers', function(req,res,next){

    const user = req.body.username;
    const head = req.body.allheaders

    if(head!=undefined){
        Header.update({username:user},{$set:{allheaders:head}}, function(err, headerlist){
        if(err){
            return res.json({success:false,msg:'Failed to delete'});
        }
        else return res.json({success:true,msg:'deleted'});
        });

    } else {
        const header= new Header({
            username:user,
            allheaders:head
        });        
        Header.addHeader(header,(err,header)=>{
            if(err){
            res.json({success:false, msg:'Failed header addition'});
            }
            else{
                console.log('added headers  '+header);
                res.json({success:true,msg:'Headers added'});
            }

        });
    }
})

>>>>>>> ce675d81f71a2ec4698b5ef88a0c52fc1fc307a0
module.exports=router;