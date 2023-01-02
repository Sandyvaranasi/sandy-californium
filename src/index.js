const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const {default : mongoose} = require('mongoose');
mongoose.set('strictQuery', true);
const route = require('./routes/route.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://sandy_varanasi:sRzKkk5zN4u6uAZG@sandy-clusture.eimj9vg.mongodb.net/group9Database", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route)

app.listen(process.env.PORT || 4000, function(){
 console.log("server running on port" + (process.env.PORT || 4000));
}) 