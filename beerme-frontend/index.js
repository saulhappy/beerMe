document.addEventListener("DOMContentLoaded", function(){
    // uncomment the getBeers function and addBeer function to populate the database. 
    // getBeers();
    let currentUser = sessionStorage.getItem('userId')
    let browseBeersContainer = document.getElementById("browse-beers-container")
    let showBeerContainer = document.getElementById("show-beer-container")

    console.log(currentUser)
    logIn()
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
    

            nameP.innerText = beer.name
            image.src = beer.image_url
            image.style.height = "200px"
            image.style.width = "65px"
            image.dataset.id = beer.id
            image.class = "card-image"

            card.append(nameP, image)
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
        let NameLi = document.createElement("li")
        NameLi.innerText = beer.name
        let taglineLi = document.createElement("li")
        taglineLi.innerText = beer.tagline
        let abvLi = document.createElement("li")
        abvLi.innerText = beer.abv
        // let type = document.createElement("li")

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

function logIn() {
    sessionStorage.clear()
    let userLogin = document.getElementById('user-login')
    userLogin.addEventListener('submit', () => {
        event.preventDefault()
        let username = document.getElementById('username').value
        fetch("http://localhost:3000/users", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Access-Control-Origin': "*"
            },
            body: JSON.stringify({'username': username })
        })
        .then(r => r.json())
        .then(input => {
            if (input.errors) {
              alert(input.errors.username)
            } else {
              sessionStorage.setItem('userId', input.id)
        }
        })
    })
    }
})
