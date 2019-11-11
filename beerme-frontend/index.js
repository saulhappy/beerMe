document.addEventListener("DOMContentLoaded", function(){
    getBeers()
})

// function getBeers(){
//     const configObject = {
//         method: "POST",
//         headers: {"Content-Type": "application/json",
//         "Accept": "application/json"},
//         body: JSON.stringify({"description": updatedDesc}) 
//     }
//     fetch("https://api.punkapi.com/v2/beers", configObject)
//     .then(r => r.json())
    
// }