/* *
 * db.js
 * Nandagopan Dilip
 * 301166925
 * 29/10/2022
 */


let atlasDB = "mongodb+srv://somebody:2ZJbMoJ5xcOW7Vvj@cluster0.7w7pf0q.mongodb.net/?retryWrites=true&w=majority";

// Database setup
let mongoose = require('mongoose');

//mongoose connection initialization to database
module.exports = function(){

    mongoose.connect(atlasDB);
    let mongodb = mongoose.connection;

    mongodb.on('error', console.error.bind(console, 'Connection Error:'));
    mongodb.once('open', ()=>{
        console.log('===> Connected to MongoDB.');
    })

    return mongodb;
}