const film = [
    {
        id: 1,
        name: "Shape of Water"
    },
    {
        id: 2,
        name: "Avatar"
    },
    {
        id: 3,
        name: "Parasite"
    },
    {
        id: 4,
        name: "Slumdog Millionaier"
    },
    {
        id: 5,
        name: "50 Shades of Grey"
    }
]

module.exports.films = film;

function films2(i){
    let y = film.filter(x=> x.id==i)
    if(y.length==1){
    return y[0].name
    }else{
        return 'No movie exists with this id'
    }
}
module.exports.films2 = films2;