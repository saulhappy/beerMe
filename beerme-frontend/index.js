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
    showBeerContainer.style.display = "none";
    browseBeersContainer.style.display = "block";
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
            nameP.dataset.id = beer.id
            image.src = beer.image_url
            image.style.height = "200px"
            image.style.width = "65px"
            image.dataset.id = beer.id
            image.class = "card-image"
            abvP.innerText = `ABV: ${beer.abv}`
            ibuP.innerText = `IBU: ${beer.ibu}`
            foodPairingUl.innerText = `Food Pairings: ${beer.food_pairing}`



            card.dataset.id = beer.id

            card.append(nameP, image, abvP, ibuP, foodPairingUl)

            beerList.append(card)
            card.addEventListener("click", showBeer)

        })
    })

}




function showBeer(event){
    let selectedBeer = event.target.dataset.id
    let beerId = event.target.dataset.id
   
    browseBeersContainer.style.display = "none";
    showBeerContainer.style.display = "block";


    fetch(`http://localhost:3000/beers/${selectedBeer}`)
    .then(r => r.json())
    .then(beer => {
    
        
        let showBeerDiv = document.getElementById("single-beer")
        let beerCard = document.createElement("card")

        beerCard.id = selectedBeer
      
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

     
        showComments(beerId)

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

  
// search for beers
const searchBar = document.getElementById("search-beers").querySelector('input');
searchBar.addEventListener('keyup', function(e){
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






function showComments(beerId){
    let commentsDiv = document.getElementById("comments-div")
    let commentForm = document.createElement("form")
    let commentBox = document.createElement("textarea")
    let commentButton = document.createElement("button")
    
   
    
    
    fetch(`http://localhost:3000/comments`)
    .then(r => r.json())
    .then(comments => {
        comments.forEach(comment => {
 
            if (comment.beer_id == beerId){
                let commentCard = document.createElement("card")
                let commentP = document.createElement("p")
                let commentUser = document.createElement("p")
                let commentBy = comment.user.username

                commentUser.innerText = commentBy
                commentP.innerText = comment.comment_text
                commentCard.append(commentP, commentUser)
                commentCard.dataset.commentId = comment.id
                commentCard.dataset.beerId = beerId
                
                commentsDiv.append(commentCard)
                commentCard.setAttribute("class", "comment-card") 
            }
        })

        commentButton.innerText = "Submit"
        commentForm.append(commentBox, commentButton)

        commentsDiv.append(commentForm)

        commentForm.addEventListener("submit", createComment)




        

    })


}




function createComment(event){
    event.preventDefault()
    
    let beerCard = document.querySelector("card")
  
    let beerId = beerCard.dataset.id

    let textarea = document.querySelector("textarea")
    let commentContent = textarea.value



    fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({user_id: 1, beer_id: beerId, comment_text: commentContent})
    })
    .then(r => r.json())
    .then(comment => {
        console.log(comment)
    })
}






})
