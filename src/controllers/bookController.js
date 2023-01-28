const { default: mongoose } = require('mongoose');
const moment = require('moment')
const bookModel = require('../models/bookModel');
const reviewsModel = require('../models/reviewsModel');
const userModel = require('../models/userModel');

const validators = require('../validations/validation')

const createBook = async function (req, res) {
    try {
        let { title, excerpt, userId, ISBN, category, subcategory, releasedAt } = req.body

        if (!title) return res.status(400).send({ status: false, message: "title is mandatory" })
        if (typeof (title) != "string") return res.status(400).send({ status: false, message: "wrong format of title" })
        if (!validators.validate(title)) return res.status(400).send({ status: false, message: "invalid title" })

        if (!excerpt) return res.status(400).send({ status: false, message: "excerpt is mandatory" })
        if (typeof (excerpt) != "string") return res.status(400).send({ status: false, message: "wrong format of excerpt" })

        if (!userId) return res.status(400).send({ status: false, message: "userId is mandatory" })
        if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ status: false, message: "invalid user id" })
        
        //Authorisation
        if(userId !== req.userId) return res.status(403).send({status:false,message:"you are not authorised for this action"})
        //Authorisation

        if (!ISBN) return res.status(400).send({ status: false, message: "ISBN is mandatory" })
        if (typeof(ISBN) != "string") return res.status(400).send({ status: false, message: "wrong format of ISBN" })
        if (!validators.validateISBN(ISBN)) return res.status(400).send({ status: false, message: "invalid ISBN" })

        if (!category) return res.status(400).send({ status: false, message: "category is mandatory" })
        if (typeof(category) != "string") return res.status(400).send({ status: false, message: "wrong format of category" })
        if(!validators.validate(category)) return res.status(400).send({status:false,message:"category should contain only alphabates"})

        if (!subcategory) return res.status(400).send({ status: false, message: "subcategory is mandatory" })
        if (typeof(subcategory) != "string") return res.status(400).send({ status: false, message: "wrong format of subcategory" })
        if(!validators.alphabets(subcategory)) return res.status(400).send({status:false,message:"subcategory should contain only alphabates"})

        if (!releasedAt) return res.status(400).send({ status: false, message: "releasedAt is mandatory" })
        if (typeof (releasedAt) != "string") return res.status(400).send({ status: false, message: "wrong date format" })
        if(moment(releasedAt).format("YYYY-MM-DD") != releasedAt) return res.status(400).send({status:false, message:"Invalid date format"})

        const findUser = await userModel.findById(userId);
        if (!findUser) return res.status(404).send({ status: false, message: "no such user found" });

        const uniqueCheck = await bookModel.findOne({ $or: [{ title: title.toLowerCase() }, { ISBN: ISBN }] })
        if (uniqueCheck) {
            if (uniqueCheck.title == title.toLowerCase()) return res.status(400).send({ status: false, mssage: "title already in use" })
            if (uniqueCheck.ISBN == ISBN) return res.status(400).send({ status: false, mssage: "ISBN already in use" })
        }

        const createdBook = await bookModel.create(req.body);
        res.status(201).send({ status: true, message: "Success", data: createdBook })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

const getBooks = async function (req, res) {
    try {
        let filter = { isDeleted: false }
        let { userId, category, subcategory,...a } = req.query

        if(Object.keys(a).length!=0) return res.status(400).send({status:false,message:"can search only using userId, category or subcategory"})

        if (userId){
             if(!mongoose.isValidObjectId(userId)) return res.status(400).send({status:false,message:"invalid userId"})
            filter.userId = userId
            }
        if (category) {
            if (typeof(category) != "string") return res.status(400).send({ status: false, message: "wrong format of category" })
            if(!validators.validate(category)) return res.status(400).send({status:false,message:"category should contain only alphabates"})
            filter.category = category
        }
        if (subcategory){
            if (typeof(subcategory) != "string") return res.status(400).send({ status: false, message: "wrong format of subcategory" })
            if(!validators.alphabets(subcategory)) return res.status(400).send({status:false,message:"subcategory should contain only alphabates"})
            filter.subcategory = subcategory
        }

        const books = await bookModel.find(filter).select({ ISBN: 0, isDeleted: 0, subcategory: 0, deletedAt: 0 }).sort({ title: 1 })

        if (books.length == 0) return res.status(404).send({ status: false, message: "no such book found" })

        res.status(200).send({ status: true, message: "Success", data: books })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}


const getBookById = async function(req,res){
    try{
        let bookId = req.params.bookId;

        if(!mongoose.isValidObjectId(bookId)) return res.status(400).send({status:false,message:"invalid bookId"});

        let bookDetail = await bookModel.findOne({_id:bookId,isDeleted:false}).lean();
        if(!bookDetail) return res.status(404).send({status:false,message:"no such book"});

        let reviewData = await reviewsModel.find({bookId:bookId,isDeleted:false});
        
        bookDetail.reviewData = reviewData;

        res.status(200).send({status:true,message:"Success",data:bookDetail})

    }catch(err){
        res.status(500).send({status:false,message:err.message})
    }
}


const updateBookById = async function(req,res){
    try{
        let bookId = req.params.bookId;
        if(!mongoose.isValidObjectId(bookId)) return res.status(400).send({status:false,message:"invalid id"});

        let data = req.body;
        
        if(Object.keys(data).length==0) return res.status(400).send({status:false,message:"please provide data to update"})

        if(data.title){
            if (typeof (title) != "string") return res.status(400).send({ status: false, message: "wrong format of title" })
        if (!validators.validate(title)) return res.status(400).send({ status: false, message: "invalid title" })
        }
        if(data.exerpt){
            if (typeof (data.excerpt) != "string") return res.status(400).send({ status: false, message: "wrong format of excerpt" })
            if(data.exerpt.trim()=="") return res.status(400).send({status:false,message:"provide any data in exerpt"})
        }
        if(data.releasedAt){
            if (!typeof (data.releasedAt) != 'string') return res.status(400).send({ status: false, message: "wrong date format" })
            if(moment(data.releasedAt).format("YYYY-MM-DD") != releasedAt) return res.status(400).send({status:false, message:"Invalid date format"})
        }
        if(data.ISBN){
            if (typeof (data.ISBN) != "string") return res.status(400).send({ status: false, message: "wrong format of ISBN" })
            if (!validators.validateISBN(data.ISBN)) return res.status(400).send({ status: false, message: "invalid ISBN" })
        }

        let {title, exerpt, releasedAt, ISBN,...a} = data
        if(Object.keys(a)!=0) return res.status(400).send({status:false,message:"you can't update the field"})

        let unique = await bookModel.findOne({$or:[{title:data.title},{ISBN:data.ISBN}]});
        if(unique){
            if(unique.ISBN==data.ISBN) return res.status(400).send({status:false,message:"ISBN already in use"})
            if(unique.title==data.title) return res.status(400).send({status:false,message:"title is already in use"})
        }

        // Authorization
        let authorisation = await bookModel.findOne({_id:bookId,userId:req.userId,isDeleted:false})
        if(!authorisation) return res.status(403).send({status:false,message:"you are not authorized for this action"})
        // Authorization

        let bookUpdate = await bookModel.findOneAndUpdate({_id:bookId,isDeleted:false},data,{new:true});
        if(!bookUpdate) return res.status(404).send({status:false,message:"no such book"});

        return res.status(200).send({status:true,message:"Success",data:bookUpdate})

    }catch(err){
        res.status(500).send({status:false,message:err.message})
    }
}


const deleteBookById = async function(req,res){
    try{
        const bookId = req.params.bookId;
        if(!mongoose.isValidObjectId(bookId)) return res.status(400).send({status:false,message:"invalid id"});

        // Authorization
        let authorisation = await bookModel.findOne({_id:bookId,userId:req.userId});
        if(!authorisation) return res.status(403).send({status:false,message:"you are not authorized for this action"});
        // Authorization

        let deleteBook = await bookModel.findOneAndUpdate({_id:bookId,isDeleted:false},{isDeleted:true});
        if(!deleteBook) return res.status(404).send({status:false,message:"no such book"});

        return res.status(200).send({status:true,message:'Success'});

    }catch(err){
        res.status(500).send({status:false,message:err.message});
    }
}


module.exports = { createBook, getBooks, getBookById, updateBookById, deleteBookById}