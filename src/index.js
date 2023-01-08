const express = require('express')
const app = express();
const  mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const route = require('./routes/route.js');

app.use(express.json())

mongoose.connect("mongodb+srv://sandy_varanasi:sRzKkk5zN4u6uAZG@sandy-clusture.eimj9vg.mongodb.net/bonus1Database", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route)

app.listen(3000, function(){
 console.log("server running on port " + 3000);
}) 