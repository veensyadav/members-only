const mongoose = require('mongoose');


exports.connectMongoose = () => {
    mongoose
    .connect('mongodb://localhost:27017/passport')
    .then(e=> console.log(`connected to mongoDB: ${e.connection.host}`))
    .catch((e) => console.log(e));
}

const userSchema = new mongoose.Schema({
    name : {
        type: String
    },
    username : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type : String
    }
});

const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    message : {
        type: String,
        required:true
    }
    // username : {
    //     type: String
    // },
    // postdate: {
    //     type: Date
    // }

})

exports.User = mongoose.model("User", userSchema);

exports.Post = mongoose.model("Post", postSchema);