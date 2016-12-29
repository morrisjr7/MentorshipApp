var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
    first_name: String,
    last_name: String,
    gender: String,
    age: Number,
    dob: Date,
    date_joined: Date

});

mongoose.model('users',usersSchema);
