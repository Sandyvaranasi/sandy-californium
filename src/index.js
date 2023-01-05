const express = require('express')
const app = express();
const {default : mongoose} = require('mongoose');
mongoose.set('strictQuery', true);    // To handle the deprication error of mongoose   -> deprication error we get whenever mongoose updated or upgraded
const route = require('./routes/route.js');

app.use(express.json())

mongoose.connect("mongodb+srv://sandy_varanasi:sRzKkk5zN4u6uAZG@sandy-clusture.eimj9vg.mongodb.net/group9Database", {
    useNewUrlParser: true  
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route)

app.listen(4000, function(){
 console.log("server running on port" + 4000);
}) 