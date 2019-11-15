document.addEventListener("DOMContentLoaded", function(){
    // uncomment the getBeers function and addBeer function to populate the database. 

    // getBeers(); 
    localStorage.clear()
    let browseBeersContainer = document.getElementById("browse-beers-container")
    let showBeerContainer = document.getElementById("show-beer-container")
    let goBack = document.getElementById("browse-beers-button")
    let beerMeBtn = document.getElementById("beerme-button")
    let accountContainer = document.getElementById("account-container")
    let browseBeers = document.getElementById("browse-beers-button")
    // let randomBeer = Math.floor(Math.random() * 100)
    let userFavs = []  // get fav beers
    fetch("http://localhost:3000/user_beers")
    .then(r => r.json())
    .then(function(favs){
        for(let i = 0; i < favs.length; i++){
            userFavs.push(favs[i].beer_id)
        }
    })

    createAccount()
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
    accountContainer.style.display = "none";
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
            let ebcP = document.createElement("p")
            let foodPairingUl = document.createElement("ul")
            let frontDiv = document.createElement("div")
            let backDiv = document.createElement("div")

            backDiv.classList.add("card-back")
            frontDiv.classList.add("card-front")
            card.classList.add("beer-card")
            image.setAttribute("class", "beers-card-img")
            nameP.setAttribute("class", "beer-list-beerName")
            ebcP.classList.add("beer-card-details")
            abvP.classList.add("beer-card-details")
            ibuP.classList.add("beer-card-details")
            foodPairingUl.classList.add("beer-card-details")

            ebcP.dataset.id = beer.id
            nameP.innerText = beer.name
            nameP.dataset.id = beer.id

            image.src = beer.image_url
            image.dataset.id = beer.id
            image.class = "card-image"
            abvP.classList.add("abv-value")
            abvP.innerText = `ABV: ${beer.abv}`

            ibuP.classList.add("ibu-value")
            ibuP.innerText = `IBU: ${beer.ibu}`
            ebcP.classList.add("ebc-value")
            ebcP.innerText = `EBC: ${beer.ebc}`
            foodPairingUl.innerText = `Food Pairings: ${beer.food_pairing}`
            foodPairingUl.classList.add("beer-pairings")
          
            abvP.dataset.id = beer.id
            ibuP.dataset.id = beer.id
            foodPairingUl.dataset.id = beer.id



            card.dataset.id = beer.id

            frontDiv.append(nameP, image)
            backDiv.append(abvP, ibuP, ebcP, foodPairingUl)
            card.append(frontDiv, backDiv)


           
            beerList.append(card)
            card.addEventListener("click", showBeer)
            

        })
    })

}

beerMeBtn.addEventListener("click", showRandomBeer)

function showRandomBeer() {
    let randomDiv = document.getElementById("single-random-beer")
    let randomBeer = Math.floor(Math.random() * 100)
    let commentsDiv = document.getElementById("comments-div")
    
    browseBeersContainer.style.display = "none";
    randomDiv.innerHTML = ""
    commentsDiv.innerHTML = ""
    showBeerContainer.style.display = "block";

    fetch(`http://localhost:3000/beers/${randomBeer}`)
    .then(r => r.json())
    .then(beer => {

        let randomDiv = document.getElementById("single-random-beer")
        let randomBeerCard = document.createElement("card")

        randomBeerCard.id = randomBeer.id
      
        let NameLi = document.createElement("p")

        NameLi.innerText = `Name: ${beer.name}`
        let taglineLi = document.createElement("p")
        taglineLi.innerText = `Tagline: ${beer.tagline}`
        let abvLi = document.createElement("p")
        abvLi.innerText = `ABV: ${beer.abv}`

      
        let ibuLi = document.createElement("p")
        ibuLi.innerText = `IBU: ${beer.ibu}`
        let description = document.createElement("p")
        description.innerText = `Description ${beer.description}`
        let beerImage = document.createElement("img")
        beerImage.src = beer.image_url
        let ul = document.createElement("ul")


        NameLi.classList.add("random-pick-name")
        taglineLi.classList.add("random-pick-tagline")
        description.classList.add("random-pick-description")
        ibuLi.classList.add("random-pick-value")
        abvLi.classList.add("random-pick-val")
        beerImage.classList.add("random-pick-img")

        ul.append(abvLi, ibuLi)

        randomBeerCard.append(NameLi, taglineLi, beerImage, description, ul)


        randomDiv.append(randomBeerCard)

    })

}

function showBeer(event){
    let selectedBeer = event.target.dataset.id
    let beerDiv = document.getElementById("single-beer")
    let commentButton = document.querySelector("button")

    browseBeersContainer.style.display = "none";
    beerDiv.innerHTML = ""
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

        let favDiv = document.createElement("div")
        favDiv.setAttribute("class", "fav-div")



        beerCard.append(NameLi, taglineLi, beerImage, description, ul, favDiv)


        showBeerDiv.append(beerCard)

      
        showComments(selectedBeer)


        // create favorite beers functions
        selectedBeer = parseInt(selectedBeer)


        let beerArea1 = document.createElement("fav-button-area-1") 
        beerArea1.setAttribute("class", "beer-area-1")
        let beerArea2 = document.getElementById("fav-button-area-2")
        beerArea2.setAttribute("class", "beer-area-2")

        let beerArea = document.getElementById("fav-button-area")
        // beerArea.innerHTML('')
        let addingFav

        if (userFavs.includes(selectedBeer)) { // if user already has beer, show text, and remove button
            beerArea1.innerText = "This is one of your favorite beers"
            // let removeFav = document.createElement("button")
            // removeFav.id = "remove-fav-btn"
            // removeFav.innerText = "Remove From Favorites"
            // beerArea.append(removeFav)
            // removeFav.addEventListener("click", destroyFav)
            showBeerDiv.append(beerArea1)
            
            
        } else { // create add button functionality
            console.log('am I being called?')
            beerArea.innerHTML = '<button id="fav-btn">Add to favorites</button>'
            // console.log('am i being read?')
            // addingFav = document.createElement("button")
            // addingFav.id = "fav-btn"
            // addingFav.innerText = "Add to Favorites"
            // beerArea.append(addingFav)
            beerArea.addEventListener("click", addFav)
           
        }
    })
    
    
function addFav(){
        const configObject = {
            method: "POST",
            headers: {"Content-Type": "application/json",
            "Accept": "application/json"},
            body: JSON.stringify({user_id: localStorage.userId, 
                beer_id: selectedBeer
            })}

            fav_url = "http://localhost:3000/user_beers"

            fetch(fav_url, configObject)
            .then(function(response){
                return response.json();
            }).then(newUserBeer => {
                document.getElementById("fav-btn").innerText = "Beer Favorited!"
                document.getElementById("fav-button-area").dataset.ubid = newUserBeer.id
            })
    }

    // function destroyFav(){
    //     const configObject = {
    //         method: "DELETE",
    //         headers: {"Content-Type": "application/json",
    //         "Accept": "application/json"},
    //         body: JSON.stringify({user_id: localStorage.userId, 
    //             beer_id: selectedBeer
    //         })}
            
    //         fav_url = `http://localhost:3000/user_beers/${ubID}`

    //         fetch(fav_url, configObject)
    //         .then(function(response){
    //             return response.json();
    //         }).then(newUserBeer => {
    //             document.getElementById("remove-fav-btn").innerText = "Removed!"
    //         })
    // }  
    } 

// show user
const userShow = document.getElementById("user-show-link")
userShow.addEventListener("click", showUser)

function showUser() {
    browseBeersContainer.style.display = "none";
    let showUserContainer = document.getElementById("container-show-user")
    showUserContainer.setAttribute("class", "show-user-container")

    let showBeerDiv = document.getElementById("single-beer")
    showBeerDiv.setAttribute("class", "fav-beer-div")
    let showBeerDivTitle = document.createElement("h3")
    showBeerDivTitle.setAttribute("class", "fav-beer-div-title")
    showBeerDivTitle.innerText = "Your Favorite Beers"
    showBeerDiv.append(showBeerDivTitle)

    let commentDiv = document.createElement("div")
    let commentDivTitle = document.createElement("h3")
    commentDivTitle.setAttribute("class", "user-comments-div-title")
    commentDivTitle.innerText = "Your Comments"
    commentDiv.setAttribute("class", "user-comments-div")
    commentDiv.append(commentDivTitle)


    let commentCard = document.createElement("card")

    fetch(`http://localhost:3000/user_beers`)
    .then(r => r.json())
    .then(beer => {
            for(let i = 0; i < beer.length; i++){

            fetch(`http://localhost:3000/beers/${beer[i].beer_id}`)
            .then(r => r.json())
            .then(beer => {

                let beerCard = document.createElement("card")
                beerCard.setAttribute("class", "beer-card")

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
                showUserContainer.append(showBeerDiv)

                showUserContainer.style.display = 'block'
            })
        }    
    }) 
    // comments sections
    fetch(`http://localhost:3000/comments`)
    .then(r => r.json())
    .then(comment => {
        for(let i = 0; i < comment.length; i++){

            commentCard.setAttribute("class", "show-user-comment-card")
            
            let textComment = document.createElement("p")
            textComment.setAttribute("class", "user-show-comment")
            textComment.innerText = comment[i].beer.name + ": " + comment[i].comment_text

            commentCard.append(textComment)
        }            
        commentDiv.append(commentCard)
        showUserContainer.append(commentDiv) 
    })   
}

function createAccount() {
    accountContainer.style.display = "block";
    showBeerContainer.style.display = "none";
    browseBeersContainer.style.display = "none";
    let accountCreate = document.getElementById('user-create')
    accountCreate.addEventListener('submit', () => {
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
              localStorage.setItem('userId', input.id)
              localStorage.setItem('userName', input.username)
              let userId = document.getElementById("hidden_user_id")
              userId.setAttribute("value", localStorage.userId)
              accountCreate.style.display = 'none'
              fetchBeers()
        }
        })
    })
}


goBack.addEventListener("click", fetchBeers)
browseBeers.addEventListener("click", fetchBeers)
  
// search for beers
const beerNameSearch = document.getElementById("search-beer-name").querySelector('input');
beerNameSearch.addEventListener('keyup', function(e){

    const term = e.target.value.toLowerCase();
    const beerList = document.getElementsByClassName("beer-list-beerName")
    
    Array.from(beerList).forEach(function(beer){
        const beerName = beer.innerText
        if (beerName.toLowerCase().indexOf(term) != -1){
            beer.parentElement.parentElement.style.display = 'block';
        } else {
            beer.parentElement.parentElement.style.display = 'none';
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
            pairing.parentElement.parentElement.style.display = 'block';
        } else {
            pairing.parentElement.parentElement.style.display = 'none';
        }
        
        })    
    })

// SLIDER FILTERS

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
            abv.parentElement.parentElement.style.display = 'block';
           
        } else {
            abv.parentElement.parentElement.style.display = 'none';
           
        }
        
    })     
}

// ibu slider filter
let ibuSlider = document.getElementById("ibu-slider");
let ibuOutput = document.getElementById("ibu-content");
ibuOutput.innerHTML = ibuSlider.value; 


ibuSlider.oninput = function() {
    ibuOutput.innerHTML = this.value;
    ibuSliderInput = parseInt(this.value)
    const ibuVal = document.getElementsByClassName("ibu-value")
    
    Array.from(ibuVal).forEach(function(ibu){
        const beerIBU = parseInt(ibu.innerText.match(numberPattern)[0])        

        if (beerIBU > ibuSliderInput){
            ibu.parentElement.parentElement.style.display = 'block';
        } else {
            ibu.parentElement.parentElement.style.display = 'none';
        }
        
    })  
}

  
function showComments(selectedBeer){
    let commentsDiv = document.getElementById("comments-div")
    let commentBoxDiv = document.getElementById("comment-box")
    let commentForm = document.getElementById("comment-form")
    let commentBox = document.createElement("textarea")
    let commentButton = document.createElement("button")
  
    commentsDiv.innerHTML = ""
      
    fetch(`http://localhost:3000/comments`)
    .then(r => r.json())
    .then(comments => {
        comments.forEach(comment => {
 
            if (comment.beer_id == selectedBeer){
               
                let commentCard = document.createElement("card")
                let commentP = document.createElement("p")
                let commentUser = document.createElement("p")
                let deleteButton = document.createElement("button")
                let editButton = document.createElement("button")
                let editForm = document.createElement("form")
                let saveButton = document.createElement("button")
                let editBox = document.createElement("textarea")

                editForm.append(editBox, saveButton)
                editForm.style.display = "none"

                editBox.id = "edit-box"
                saveButton.dataset.id = comment.id
                saveButton.innerText = "Save"
                editForm.dataset.id = comment.id
                deleteButton.innerText = "Delete"
                deleteButton.style.display = "none"
                editButton.innerText = "Edit"
                editButton.style.display = "none"
                deleteButton.dataset.id = comment.id
                editButton.dataset.id = comment.id
                commentCard.dataset.id = comment.id
      
                deleteButton.addEventListener("click", deleteComment)
                // editButton.addEventListener("click", editComment)
                
                

                
                let commentBy = comment.user.username
                commentUser.innerText = commentBy
                commentP.innerText = comment.comment_text
                commentCard.append(commentP, commentUser, editButton, deleteButton, editForm)

             
                if (comment.user_id == localStorage.userId){
                    deleteButton.style.display = "block"
                    editButton.style.display = "block"
                }
                
                commentsDiv.append(commentCard)
                commentCard.setAttribute("class", "comment-card") 
            }
        })
  
        let beerId = document.getElementById("hidden_beer_id")
        beerId.setAttribute("value", selectedBeer)
        let userId = document.getElementById("hidden_user_id")
        userId.setAttribute("value", localStorage.userId)
     

        commentForm.innerHTML = ""

        commentBox.id = "comment-form-box"
        commentButton.innerText = "Submit"
        commentForm.append(commentBox, commentButton)
        commentBoxDiv.append(commentForm)
        commentForm.addEventListener("submit", createComment)
    })


// ebc slider filter
let ebcSlider = document.getElementById("ebc-slider");
let ebcOutput = document.getElementById("ebc-content");
ebcOutput.innerHTML = ebcSlider.value; 


ebcSlider.oninput = function() {
    ebcOutput.innerHTML = this.value;
    ebcSliderInput = parseInt(this.value)
    const ebcVal = document.getElementsByClassName("ebc-value")
    
    Array.from(ebcVal).forEach(function(ebc){
        const beerebc = parseInt(ebc.innerText.match(numberPattern)[0])        

})


        if (beerebc > ebcSliderInput){
            ebc.parentElement.style.display = 'block';
        } else {
            ebc.parentElement.style.display = 'none';
        }
        

}

// reset forms
document.addEventListener("click", function(){
    document.getElementById("search-beer-name").reset()
    document.getElementById("search-beer-pairings").reset()
})



function createComment(event){
    event.preventDefault()
    
 
    let beerId = document.getElementById("hidden_beer_id").value
    let userId = document.getElementById("hidden_user_id").value

    
    let textarea = document.getElementById("comment-form-box")

    let commentContent = textarea.value

    
    fetch("http://localhost:3000/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({user_id: localStorage.userId, beer_id: beerId, comment_text: commentContent})
    })
    .then(r => r.json())
    .then(comment => {
        let commentsDiv = document.getElementById("comments-div")
        let commentCard = document.createElement("card")
        let commentP = document.createElement("p")
        let commentUser = document.createElement("p")
        let deleteButton = document.createElement("button")
        let editButton = document.createElement("button")
        let editForm = document.createElement("form")
        let editBox = document.createElement("textarea")
        let saveButton = document.createElement("button")
        
        

       
        let commentBy = localStorage.userName




        editForm.append(editBox, saveButton)
        editForm.style.display = "none"

        editBox.id = "edit-box"
        saveButton.dataset.id = comment.id
        saveButton.innerText = "Save"
        editForm.dataset.id = comment.id
        deleteButton.innerText = "Delete"
        deleteButton.style.display = "none"
        editButton.innerText = "Edit"
        editButton.style.display = "none"
        deleteButton.dataset.id = comment.id
        editButton.dataset.id = comment.id
        commentCard.dataset.id = comment.id


        
        commentUser.innerText = commentBy
        commentP.innerText = comment.comment_text
        commentP.setAttribute("class", "commentP")
        commentCard.append(commentP, commentUser)
        commentCard.dataset.commentId = comment.user_id
        commentCard.dataset.beerId = comment.beer_id
        
        commentCard.append(editButton, deleteButton, editForm)
        commentsDiv.append(commentCard)
        commentCard.setAttribute("class", "comment-card") 
        if (comment.user_id == localStorage.userId){
            deleteButton.style.display = "block"
            editButton.style.display = "block"
        }
      
        deleteButton.addEventListener("click", deleteComment)
        editButton.addEventListener("click", editComment)
        saveButton.addEventListener("click", editCommentFetch)
        textarea.value = ""
    })

} 

}


function deleteComment(event){
    let commentToDel = event.target.dataset.id
    let commentParent = event.target.parentElement

  
    fetch(`http://localhost:3000/comments/${commentToDel}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id: commentToDel})
    })
    .then(r => r.json())
    .then(comment => {
        commentParent.remove()
    })

}



function editComment(event){
    event.preventDefault()
    console.log("edit comment function")
    let commentCard = event.target.parentElement
    let editForm = commentCard.querySelector("form")
    let oldText = commentCard.querySelector("p")
    let editBox = editForm.querySelector("textarea")
    let saveButton = editForm.querySelector("button")
   
    

    editBox.value = oldText.innerText

    editForm.style.display = "block"
    
    // saveButton.addEventListener("click", editCommentFetch)
}





function editCommentFetch(event){
    event.preventDefault()
    let commentToEdit = event.target.dataset.id
    commentToEdit = parseInt(commentToEdit)
    
    let commentForm = event.target.parentElement
    let newText = commentForm.querySelector("#edit-box").value
    
    let commentCard = commentForm.parentElement
  
    let commentP = commentCard.getElementsByClassName("commentP")
    commentP = commentP[0]
    commentP.innerText = newText
   



    fetch(`http://localhost:3000/comments/${commentToEdit}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json",
                    "Accept": "application/json"},
        body: JSON.stringify({comment_text: newText})
    })
    .then(r => r.json())
    .then(comment => {
        let editForm = commentCard.querySelector("form")
        editForm.style.display = "none"
})
}

})