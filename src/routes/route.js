const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const bookController = require('../controllers/bookController');
const reviewController  = require('../controllers/reviewsController')

const midware = require('../midwares/auth')

router.post('/register',userController.createUser);
router.post('/login',userController.userLogin);

router.post('/books', midware.authenticate, bookController.createBook);
router.get('/books', midware.authenticate, bookController.getBooks);
router.get('/books/:bookId',midware.authenticate, bookController.getBookById);
router.put('/books/:bookId',midware.authenticate, bookController.updateBookById);
router.delete('/books/:bookId',midware.authenticate, bookController.deleteBookById);

router.post('/books/:bookId/review', reviewController.createReviws);
router.put('/books/:bookId/review/:reviewId', reviewController.updateReviews);
router.delete('/books/:bookId/review/:reviewId', reviewController.deleteReviews);


router.all('/*',()=>{
    return res.status(400).send({status:false,message:"invalid url"})
})

module.exports = router