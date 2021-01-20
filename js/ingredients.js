document.addEventListener("DOMContentLoaded", function() {
    var myObj = [];
    var myObjRecipe = [];
    var rightList = [];


    // Fetch the json file which contains all the ingredients (Using fetch instead of XMLHttpRequest cause it's better!)
    fetch("./js/ingredients.json")
        .then(response => response.json())
        .then(myObj => {

            myObj.forEach(element => {
                var card = new CardsIngredients(element.ingredientId, element.name, element.url);
                card.createIngredientCards();
            });

            var right = document.querySelectorAll(".buttonLike");
            right.forEach(element => {
                element.addEventListener('click', (e) => swipe("Right"))
            })

            var left = document.querySelectorAll(".buttonDislike");
            left.forEach(element => {
                element.addEventListener('click', (e) => swipe("Left"))
            })

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

    function swipe(leftOrRight) {
        var currentCard = event.currentTarget.parentNode.parentNode;
        var cardNext;
        var thirdCard;
        var fourthCard;
        if (leftOrRight == "Right") {
            checkValidRecipe();
        }
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

        var direction = "swipe" + leftOrRight;
        currentCard.classList.add(direction);
        document.addEventListener('animationend', () => {
            currentCard.classList.remove("currentCard");
        });

    }

    function checkValidRecipe() {
        var currentCard = event.currentTarget.parentNode.parentNode;
        console.log(currentCard);
        var ingredientAdd = currentCard.childNodes[0].textContent; // récuperer le texte dadns le titre de la carte sélectionnée
        rightList.push(ingredientAdd); // rajoute dans la liste
        console.log(rightList);
        validRecipes = [];

        console.log(myObjRecipe);
        for (var i = 0; i < myObjRecipe.length; i++) { // parcours l'ensemble des recettes
            if (rightList.every(e => myObjRecipe[i].ingredients.includes(e))) { // on verifie si tous les elements de la liste des ingrédients sélectionnés sont inclus dans une liste d'ingrédient d'une recette.
                validRecipes.push(myObjRecipe[i]);
            }
        }
        console.log(validRecipes)

        var recipesAvailables
        if (validRecipes.length < 2) {
            recipesAvailables = "There is " + validRecipes.length + " recipe available.";
        } else {
            recipesAvailables = "There are " + validRecipes.length + " recipes available.";
        }
        document.getElementById("sentenceRecipesAvailable").innerHTML = recipesAvailables;

    }

    function doSetRecipe() {
        localStorage.setItem("validRecipes", JSON.stringify(validRecipes));
    }

});