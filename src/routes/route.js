const express = require('express');
const router = express.Router();

router.get('/students/:name', function(req, res) {
    let studentName = req.params.name
    console.log(studentName)
    res.send(studentName)
})

router.get("/random" , function(req, res) {
    res.send("hi there")
})


router.get("/test-api" , function(req, res) {
    res.send("hi FunctionUp")
})


router.get("/test-api-2" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API")
})


router.get("/test-api-3" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API. And NOw i am bored of creating API's ")
})


router.get("/test-api-4" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s ")
})



router.get("/test-api-5" , function(req, res) {
    res.send("hi FunctionUp5. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s ")
})

router.get("/test-api-6" , function(req, res) {
    res.send({a:56, b: 45})
})

router.post("/test-post", function(req, res) {
    res.send([ 23, 45 , 6])
})


router.post("/test-post-2", function(req, res) {
    res.send(  { msg: "hi" , status: true }  )
})

router.post("/test-post-3", function(req, res) {
    // let id = req.body.user
    // let pwd= req.body.password

    // console.log( id , pwd)

    console.log( req.body )

    res.send(  { msg: "hi" , status: true }  )
})



router.post("/test-post-4", function(req, res) {
    let arr= [ 12, "functionup"]
    let ele= req.body.element
    arr.push(ele)
    res.send(  { msg: arr , status: true }  )
})

// // adding new players info in array using POST API

let playersInfo = [
    {
        'name': 'Virat',
        'DOB':  "12/2/1997",
        'gender': 'male',
        'city': 'delhi',
        'sport': [
            'cricket'
        ]
    },
    {
        'name': 'Rahul',
        'DOB':   "16/12/1997"  ,
        'gender': 'male',
        'city': 'U.P',
        'sport': [
            'kabaddi'
        ]
    },
    {
        'name': 'Mary kom',
        'DOB':  "23/5/1994",
        'gender': 'female',
        'city': 'sikkim',
        'sport': [
            'boxing'
        ]
    },
    {
        'name': 'P.V Sindhu',
        'DOB':   "12/3/1996"  ,
        'gender': 'female',
        'city': 'karnataka',
        'sport': [
            'badminton'
        ]
    }
]
router.post("/players", function (req, res) {
    let newPlayer = req.body.player;
       let a = playersInfo.filter(x=> x.name==newPlayer.name)
       
       if(a.length==0){
        playersInfo.push(newPlayer);
        return res.send(playersInfo)
       }else{
        return res.send(playersInfo);
       }

});

module.exports = router;