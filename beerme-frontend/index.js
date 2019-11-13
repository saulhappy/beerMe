document.addEventListener("DOMContentLoaded", function(){
    // uncomment the getBeers function and addBeer function to populate the database. 
    // getBeers();
    let currentUser = sessionStorage.getItem('userId')
    let browseBeersContainer = document.getElementById("browse-beers-container")
    let showBeerContainer = document.getElementById("show-beer-container")
    

    
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
            abvP.dataset.id = beer.id
            ibuP.innerText = `IBU: ${beer.ibu}`
            ibuP.dataset.id = beer.id
            foodPairingUl.innerText = `Food Pairings: ${beer.food_pairing}`
            foodPairingUl.dataset.id = beer.id



            card.dataset.id = beer.id

            card.append(nameP, image, abvP, ibuP, foodPairingUl)

            beerList.append(card)
            card.addEventListener("click", showBeer)

        })
    })

}




function showBeer(event){
 
    let selectedBeer = event.target.dataset.id
  
    let commentButton = document.querySelector("button")

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

      
        showComments(selectedBeer)

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
              let userId = document.getElementById("hidden_user_id")
              userId.setAttribute("value", currentUser)
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






function showComments(selectedBeer){
    let commentsDiv = document.getElementById("comments-div")
    let commentBoxDiv = document.getElementById("comment-box")
    let commentForm = document.getElementById("comment-form")
    let commentBox = document.createElement("textarea")
    let commentButton = document.createElement("button")
    
   
    
    
    fetch(`http://localhost:3000/comments`)
    .then(r => r.json())
    .then(comments => {
        comments.forEach(comment => {
 
            if (comment.beer_id == selectedBeer){
               
                let commentCard = document.createElement("card")
                let commentP = document.createElement("p")
                let commentUser = document.createElement("p")
                let commentBy = comment.user.username

                commentUser.innerText = commentBy
                commentP.innerText = comment.comment_text
                commentCard.append(commentP, commentUser)
                
                
                commentsDiv.append(commentCard)
                commentCard.setAttribute("class", "comment-card") 
            }
        })
  
        debugger
        let beerId = document.getElementById("hidden_beer_id")
        beerId.setAttribute("value", selectedBeer)
        let userId = document.getElementById("hidden_user_id")
        userId.setAttribute("value", currentUser)
     

       
        commentButton.innerText = "Submit"
        commentForm.append(commentBox, commentButton)

        commentBoxDiv.append(commentForm)

        commentForm.addEventListener("submit", createComment)
     

    })


}




function createComment(event){
    event.preventDefault()

 
    let beerId = document.getElementById("hidden_beer_id").value
    let userId = document.getElementById("hidden_user_id").value
    debugger
    let textarea = document.querySelector("textarea")
    let commentContent = textarea.value

 
    fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({user_id: userId, beer_id: beerId, comment_text: commentContent})
    })
    .then(r => r.json())
    .then(comment => {
    
        let commentsDiv = document.getElementById("comments-div")
        let commentCard = document.createElement("card")
        let commentP = document.createElement("p")
        let commentUser = document.createElement("p")
        // username not found
        
       
        let commentBy = currentUser


        commentUser.innerText = commentBy
        commentP.innerText = comment.comment_text
        commentCard.append(commentP, commentUser)
        commentCard.dataset.commentId = comment.user_id
        commentCard.dataset.beerId = comment.beer_id
                
        commentsDiv.append(commentCard)
        commentCard.setAttribute("class", "comment-card") 
    })

}






})
