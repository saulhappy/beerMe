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
            let ebcP = document.createElement("p")
            let foodPairingUl = document.createElement("ul")
    
            nameP.setAttribute("class", "beer-list-beerName")
            nameP.innerText = beer.name
            image.src = beer.image_url
            image.style.height = "200px"
            image.style.width = "65px"
            image.dataset.id = beer.id
            image.class = "card-image"
            abvP.setAttribute("class", "abv-value")
            abvP.innerText = `ABV: ${beer.abv}`
            ibuP.setAttribute("class", "ibu-value")
            ibuP.innerText = `IBU: ${beer.ibu}`
            ebcP.setAttribute("class", "ebc-value")
            ebcP.innerText = `EBC: ${beer.ebc}`
            foodPairingUl.innerText = `Food Pairings: ${beer.food_pairing}`
            foodPairingUl.setAttribute("class", "beer-pairings")



            card.append(nameP, image, abvP, ibuP, ebcP, foodPairingUl)
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

let numberPattern = /\d+/g;

// abv slider filter
let abvSlider = document.getElementById("abv-slider");
let abvOutput = document.getElementById("abv-content");
abvOutput.innerHTML = abvSlider.value; // Display the default slider value

abvSlider.oninput = function() {
    abvOutput.innerHTML = this.value;
    abvSliderInput = parseInt(this.value)
    const abvVal = document.getElementsByClassName("abv-value")
    
    Array.from(abvVal).forEach(function(abv){
        const beerABV = parseInt(abv.innerText.match(numberPattern)[0])
    
        if (beerABV > abvSliderInput){
            abv.parentElement.style.display = 'block';
        } else {
            abv.parentElement.style.display = 'none';
        }
        
        })  

}


// ibu slider filter
let ibuSlider = document.getElementById("ibu-slider");
let ibuOutput = document.getElementById("ibu-content");
ibuOutput.innerHTML = ibuSlider.value; 

ibuSlider.oninput = function() {
    ibuOutput.innerHTML = this.value;
}

// ebc slider filter
let ebcSlider = document.getElementById("ebc-slider");
let ebcOutput = document.getElementById("ebc-content");
ebcOutput.innerHTML = ebcSlider.value; 

ebcSlider.oninput = function() {
    ebcOutput.innerHTML = this.value;
}

// reset forms
document.addEventListener("click", function(){
    document.getElementById("search-beer-name").reset()
    document.getElementById("search-beer-pairings").reset()
})












})


