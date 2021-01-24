class CardsIngredients {

    // Construtor of the class CardsIngredients
    constructor(ingredientId, name, url) {
        this.ingredientId = ingredientId;
        this.name = name;
        this.url = url;
    }

    // Creation of the ingredient cards
    createIngredientCards() {

        // Creation of all the variables
        var containerIngredientCards = document.querySelector('#containerIngredientCards');
        var cardIngredient = document.createElement("div");
        var titleIngredient = document.createElement("p");
        var titleText = document.createTextNode(this.name);
        var pictureDiv = document.createElement("div");
        var buttonContainer = document.createElement("div");
        var buttonDislike = document.createElement("button");
        var iconDislike = document.createElement("i");
        var buttonLike = document.createElement("button");
        var iconLike = document.createElement("i");

        // Add the image paths
        pictureDiv.style["background-image"] = "url(assets/pictures/" + this.url + ")";

        // Add style in the various div (with the framework Tailwind)
        // For the top elements
        containerIngredientCards.className += "relative m-auto flex-col justify-center items-center";
        cardIngredient.className += "cardIngredient absolute flex flex-col border-solid border-2 border-black border-opacity-50 text-center content-center z-50 items-center justify-around";
        pictureDiv.className += "pictureDiv border-solid border-2 border-black border-opacity-50 w-10/12 h-3/4";
        buttonContainer.className += "buttonContainer flex justify-around w-full mt-4 mb-4";

        // For the dislike button
        buttonDislike.className += "buttonDislike relative text-red-500 bg-white rounded-full ";
        iconDislike.className += "iconDislike relative fa fa-times";

        // For the like button
        buttonLike.className += "buttonLike relative text-green-500 bg-white rounded-full  border-none";
        iconLike.className += "iconLike relative fa fa-heart";


        // Add ID to the card ingredients
        cardIngredient.id += this.ingredientId;
        // If the ingredient card is one of the first three, add a class name
        if (this.ingredientId == 1) {
            cardIngredient.className += " currentCard";
        } else if (this.ingredientId == 2) {
            cardIngredient.className += " cardNext";
        } else if (this.ingredientId == 3) {
            cardIngredient.className += " thirdCard";
        }

        // Add nodes in the various HTML elements
        containerIngredientCards.prepend(cardIngredient);
        cardIngredient.appendChild(titleIngredient);
        titleIngredient.appendChild(titleText);
        cardIngredient.appendChild(pictureDiv);
        cardIngredient.appendChild(buttonContainer);
        buttonContainer.appendChild(buttonDislike);
        buttonDislike.appendChild(iconDislike);
        buttonContainer.appendChild(buttonLike);
        buttonLike.appendChild(iconLike);
        buttonDislike.setAttribute("aria-hidden", "true");
        buttonLike.setAttribute("aria-hidden", "true");
    }

}