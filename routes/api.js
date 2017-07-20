//Dependencies
var express= require('express');
var router = express.Router();
var cors=require('cors')

//Models
var Product = require('../models/product');

//Routes
Product.methods(['get','put','post', 'delete']);

Product.register(router,'/product');

router.delete('/product',function(req,res){
var u_id=req.param.user_id;
var query={user_id:user_id};
Product.remove(query, function(err){
if (err) return handleError(err)
});

});

router.post('/product',function(req,res){
    var data=req.body;
    Product.create(data,function (err, data) {
  if (err) return handleError(err)});
});


//allow cors
router.use(cors());

module.exports=router