const express = require('express');
const router = express.Router();


let persons= [
    {
    name: "Sandy",
    age: 10,
    votingStatus: false
 },
 {
    name: "Prashant",
    age: 20,
    votingStatus: false
 },
 {
    name: "Sushant",
    age: 70,
    votingStatus: false
 },
 {
    name: "Jassu",
    age: 5,
    votingStatus: false
 },
 {
    name: "CC",
    age: 40,
    votingStatus: false
 }
 ]
 router.post("/legalVoter/", function(req,res){
let voter = req.query.votingAge;
let canVote = persons.filter(x=> x.age>=voter);
canVote.map(x=> x.votingStatus=true)
res.send(canVote)
 })
 


module.exports = router;