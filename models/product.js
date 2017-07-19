var restful = require('node-restful');
var mongoose = restful.mongoose;

var ContactSchema = mongoose.Schema({
    user_id: Number,
    phone: Number
    
});

//Return model
module.exports= restful.model('Product', ContactSchema);