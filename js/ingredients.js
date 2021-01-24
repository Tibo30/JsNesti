// Attach a click event to the document
document.addEventListener("DOMContentLoaded", function() {

    // Creation of the variables
    var myObj = [];
    var myObjRecipe = [];
    var rightList = [];
    var validRecipes = [];
    var recipesAvailables;

    // Fetch the json file which contains all the ingredients (Using fetch instead of XMLHttpRequest cause it's better!)
    fetch("./js/ingredients.json")
        .then(response => response.json())
        .then(data => myObj = data)
        .then(response => {

            // For each element in the JSON, create a card (with the constructor)
            response.forEach(element => {
                var card = new CardsIngredients(element.ingredientId, element.name, element.url);
                card.createIngredientCards();
            });

            // Add event listener on the like buttons that launches the right animation on click
            var right = document.querySelectorAll(".buttonLike");
            right.forEach(element => {
                element.addEventListener('click', (e) => swipe("Right"))
            })

            // Add event listener on the dislike buttons that launches the left animation on click
            var left = document.querySelectorAll(".buttonDislike");
            left.forEach(element => {
                element.addEventListener('click', (e) => swipe("Left"))
            })

            // Add event listener on the recipe review button that launches the web page that displays the recipes
            var consult = document.querySelector("#consultRecipe");
            consult.addEventListener('click', function() {
                doSetRecipe();
                window.location.href = 'recipe.html';
            });
        })

    // Fetch the json file which contains all the recipes (Using fetch instead of XMLHttpRequest cause it's better!)
    fetch("./js/recipes.json")
        .then(response => response.json())
        .then(data => myObjRecipe = data)

    // Identify the cards, store the ones selected and display recipes available
    function swipe(leftOrRight) {

        // Identification of the first four cards
        identificationCards(leftOrRight);

        // Store the ingredient 
        if (leftOrRight == "Right") {
            checkRecipesAvailable();
        }

        // Display the number of recipes available 
        resultRecipe();
    }

    // Identification of the first four cards
    function identificationCards(leftOrRight) {

        // Creation of the local variables
        var currentCard = event.currentTarget.parentNode.parentNode;
        var cardNext;
        var thirdCard;
        var fourthCard;

        // Change the class of the card to keep a controle on the first four (necessary for the inclination)
        if (currentCard.id != (myObj.length)) {
            if (currentCard.id == (myObj.length - 1)) {
                cardNext = currentCard.previousSibling;
            } else {
                if (currentCard.id == (myObj.length - 2)) {
                    cardNext = currentCard.previousSibling;
                    thirdCard = cardNext.previousSibling;
                } else {
                    cardNext = currentCard.previousSibling;
                    thirdCard = cardNext.previousSibling;
                    fourthCard = thirdCard.previousSibling;
                    fourthCard.classList.add("thirdCard");
                }
                thirdCard.classList.add("cardNext");
                thirdCard.classList.remove("thirdCard");
            }
            cardNext.classList.add("currentCard");
            cardNext.classList.remove("cardNext");
        }

        // Add direction of the cards
        var direction = "swipe" + leftOrRight;
        currentCard.classList.add(direction);
        
         // Remove the tag currentCard at the end of the animation
        document.addEventListener('animationend', () => {
            currentCard.classList.remove("currentCard");
        });
    }

    // Compare the list of ingredients chosed by the user with the list of recipes available
    function checkRecipesAvailable() {

        var divCurrentCard = event.currentTarget.parentNode.parentNode; // Get the informations of the chosen card after the click on the like button
        var ingredientAdd = divCurrentCard.childNodes[0].textContent; // Get the title of the chosen card
        rightList.push(ingredientAdd); // Push the title in an array


        for (var i = 0; i < myObjRecipe.length; i++) { // Browse all the recipes
            if (rightList.every(e => myObjRecipe[i].ingredients.includes(e))) { // Check if all the ingredients contained in the ingredients list are included in the ingredients of each recipe in the recipe list
                validRecipes.push(myObjRecipe[i]); // Push the recipe in the array validRecipes
            }
        }

    }

    // Display the number of recipes available 
    function resultRecipe() {

        if (validRecipes.length < 2) {
            recipesAvailables = "There is " + validRecipes.length + " recipe available.";
        } else {
            recipesAvailables = "There are " + validRecipes.length + " recipes available.";
        }
        document.getElementById("sentenceRecipesAvailable").innerHTML = recipesAvailables;

    }

    // Save the list containing the valid recipes into the local storage
    function doSetRecipe() {
        localStorage.setItem("validRecipes", JSON.stringify(validRecipes));
    }

});
