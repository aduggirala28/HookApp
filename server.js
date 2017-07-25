const express = require('express'),
    path=require('path'),
    config=require('./config/database')
    mongoose=require('mongoose'),
    bodyParser=require('body-parser'),
    passport=require('passport'),
    cors=require('cors'),
    options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };


//const port=3000;
const port = process.env.PORT||8080;

//User 
const users=require('./routes/users');

//Express
const app=express();

//body parser middleware : grab data from form etc
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// allow cors
app.use(cors());

//static path : public -- client side, Angular App
app.use(express.static(path.join(__dirname,'public')));


//passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


 
app.use('/users',users);

//Index Route 
app.get('/',function(req,res){
res.send('Invalid Endpoint');

});

//promises error
mongoose.Promise = global.Promise;

//MongoDB
mongoose.connect(config.database,options);

mongoose.connection.on('connected', ()=>{
  console.log('connected to database '+config.database);
});

mongoose.connection.on('error',(err)=>{
  console.log('Database error: '+err);
});

//routes
app.use('/api', require('./routes/api'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.get('*',(req,res)=>{
//   res.sendFile(path.join(__dirname,'public/index.html'))
// });
//start server
app.listen(port,function(){
console.log('API is running on port 3000');
});
