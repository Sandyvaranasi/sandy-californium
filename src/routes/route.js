const express = require('express');
const router = express.Router();

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});
router.get('/test-you', function (req, res) {
    console.log("I did it myself!")
    res.send('Changes made by me!')
});

module.exports = router;