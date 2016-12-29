/**
 * Created by josh on 11/20/16.
 */
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

userProvider = function(host, port) {
    this.db= new Db('node-mongo-users', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
    this.db.open(function(){});
    console.log("MongoDB connection established at "+host+" at port:"+port)
};


userProvider.prototype.getCollection= function(callback) {
    this.db.collection('users', function(error, user_collection) {
        if( error ) callback(error);
        else callback(null, user_collection);
    });
};

//find all users
userProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, user_collection) {
        if( error ) callback(error)
        else {
            user_collection.find().toArray(function(error, results) {
                if( error ) callback(error)
                else callback(null, results)
            });
        }
    });
};

//find a user by ID
userProvider.prototype.findById = function(id, callback) {
    this.getCollection(function(error, user_collection) {
        if( error ) callback(error)
        else {
            user_collection.findOne({_id: user_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
                if( error ) callback(error)
                else callback(null, result)
            });
        }
    });
};


//save new user
userProvider.prototype.save = function(user, callback) {
    this.getCollection(function(error, user_collection) {
        if( error ) callback(error)
        else {
            if( typeof(user.length)=="undefined")
                user = [user];


            for( var i =0;i< user.length;i++ ) {
                newuser = user[i];
                newuser.created_at = new Date();
            }

            user_collection.insert(user, function() {
                console.log(user+" inserted")
                callback(null, user);
            });
        }
    });
};

// update a user
userProvider.prototype.update = function(userId, users, callback) {
    this.getCollection(function(error, user_collection) {
        if( error ) callback(error);
        else {
            user_collection.update(
                {_id: user_collection.db.bson_serializer.ObjectID.createFromHexString(userId)},
                users,
                function(error, users) {
                    if(error) callback(error);
                    else callback(null, users)
                });
        }
    });
};

//delete user
userProvider.prototype.delete = function(userId, callback) {
    this.getCollection(function(error,user_collection) {
        if(error) callback(error);
        else {
            user_collection.remove(
                {_id: user_collection.db.bson_serializer.ObjectID.createFromHexString(employeeId)},
                function(error, user){
                    if(error) callback(error);
                    else callback(null, user)
                });
        }
    });
};

exports.userProvider = userProvider;