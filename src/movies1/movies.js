const movie = ["Funtoosh","Gadar","Border","Haunted","Zid"];
const movie1 = function(i){
    if(i<0){
        console.log("Invalid Index.")
    }else if(i>movie.length-1){
        console.log("Please enter a valid index.")
    }else{
    console.log(`The name of movie is ${movie[i]}`)
    }
}

module.exports.movie1 = movie1;