document.addEventListener("DOMContentLoaded", function(){
    // uncomment the getBeers function and addBeer function to populate the database. 
    // getBeers();

    let browseBeersContainer = document.getElementById("browse-beers-container")
    let showBeerContainer = document.getElementById("show-beer-container")

    fetchBeers()




// function getBeers(){
//     fetch("https://api.punkapi.com/v2/beers?page=4&per_page=60")
//     .then(r => r.json())
//     .then(beers => {
//         beers.forEach(beer => {
//             addBeer(beer);
//         })
//     })
    
// }

// function addBeer(beer){
 
//     fetch("http://localhost:3000/beers", {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Origin': "*"
//         },
//         body: JSON.stringify(beer)
//         }
//         )
//         .then(r => r.json)
//         .then(beer => {
            
//         })
        
// }


function fetchBeers(){
    showBeerContainer.style.visibility = "hidden";
    browseBeersContainer.style.visibility = "visible";
    let beerList = document.getElementById("beer-list")

    
    fetch("http://localhost:3000/beers")
    .then(r => r.json())
    .then(beers => {
        beers.forEach(beer => {
            let card = document.createElement("card")
            let nameP = document.createElement("p")
            let image = document.createElement("img")
            let abvP = document.createElement("p")
            let ibuP = document.createElement("p")
            let foodPairingUl = document.createElement("ul")
    
            nameP.setAttribute("class", "beer-list-beerName")
            nameP.innerText = beer.name
            image.src = beer.image_url
            image.style.height = "200px"
            image.style.width = "65px"
            image.dataset.id = beer.id
            image.class = "card-image"
            abvP.innerText = `ABV: ${beer.abv}`
            ibuP.innerText = `IBU: ${beer.ibu}`
            foodPairingUl.innerText = `Food Pairings: ${beer.food_pairing}`
            foodPairingUl.setAttribute("class", "beer-pairings")



            card.append(nameP, image, abvP, ibuP, foodPairingUl)
            beerList.append(card)
            card.addEventListener("click", showBeer)

        })
    })

}




function showBeer(event){
    let selectedBeer = event.target.dataset.id
    browseBeersContainer.style.visibility = "hidden";
    showBeerContainer.style.visibility = "visible";


    fetch(`http://localhost:3000/beers/${selectedBeer}`)
    .then(r => r.json)
    .then(beer => {
        let showBeerDiv = document.getElementById("single-beer")
        let beerCard = document.createElement("card")
        let NameLi = document.createElement("p")
        NameLi.innerText = beer.name
        let taglineLi = document.createElement("li")
        taglineLi.innerText = beer.tagline
        let abvLi = document.createElement("li")
        abvLi.innerText = beer.abv
        
        let ibuLi = document.createElement("li")
        ibuLi.innerText = beer.ibu
        let description = document.createElement("li")
        description.innerText = beer.description
        let beerImage = document.createElement("img")
        beerImage.src = beer.image_url
        let ul = document.createElement("ul")


        ul.append(abvLi, ibuLi)

        beerCard.append(NameLi, taglineLi, beerImage, description, ul)


        showBeerDiv.append(beerCard)



    })
}



// search for beers by name
const beerNameSearch = document.getElementById("search-beer-name").querySelector('input');
beerNameSearch.addEventListener('keyup', function(e){
    const term = e.target.value.toLowerCase();
    const beerList = document.getElementsByClassName("beer-list-beerName")
    
    Array.from(beerList).forEach(function(beer){
        const beerName = beer.innerText
        if (beerName.toLowerCase().indexOf(term) != -1){
            beer.parentElement.style.display = 'block';
        } else {
            beer.parentElement.style.display = 'none';
        }
        
        })    
    })

// search by food pairings
const beerPairingSearch = document.getElementById("search-beer-pairings").querySelector('input');
beerPairingSearch.addEventListener('keyup', function(e){
    const term = e.target.value.toLowerCase();
    const beerPairings = document.getElementsByClassName("beer-pairings")
    
    Array.from(beerPairings).forEach(function(pairing){
        const beerPairing = pairing.innerText
        if (beerPairing.toLowerCase().indexOf(term) != -1){
            pairing.parentElement.style.display = 'block';
        } else {
            pairing.parentElement.style.display = 'none';
        }
        
        })    
    })



})



