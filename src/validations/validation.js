const validate= function(input){
if(input.match (/^([a-z A-Z 0-9 -]){2,50}$/)) return true
}

const alphabets = function(input){
    if(input.match(/^([a-z A-Z]){2,50}$/)) return true
}

const validateObjectId =function(input){
    if(input.match(/^[a-f\d]{24}$/i)) return true;
}

const validateISBN= function(input){
    if(input.match(/^(?:\D*\d){10}(?:(?:\D*\d){0,3})$/)) return true
}

const validateEmail = function(input){
    if(input.match(/^[a-zA-z0-9]{6,15}.+\@.+\..+/)) return true
}

const validatePassword = function(input){
    if(input.match(/^[a-zA-Z0-9!@#$%^&*]{8,15}$/)) return true
}

const validatePhone = function(input){
    if(input.match(/^[6-9][0-9]{9}$/)) return true
}


module.exports={validate,alphabets,validateObjectId,validateISBN,validateEmail,validatePassword,validatePhone}