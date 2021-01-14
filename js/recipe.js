document.addEventListener("DOMContentLoaded", function () {
    var recipe = JSON.parse(localStorage.getItem("validRecipes"));

    class Recipes {
        constructor(recipeId, name, ingredients, url, http) {
            this.recipeId = recipeId;
            this.name = name;
            this.ingredients = ingredients;
            this.url = url;
            this.http = http;
        }

        create() {
            var container = document.querySelector('#containerRecipe');
            var cardRecipe = document.createElement("div");
            var title = document.createElement("p");
            var titleText = document.createTextNode(this.name);
            var pictureDiv = document.createElement("div");
            pictureDiv.style["background-image"] = "url(assets/pictures/" + this.url + ")";
           
            // Add style in the various div
            container.className = "relative m-auto flex flex-row flex-wrap justify-center items-center";
            cardRecipe.className += "cardIngredient relative flex flex-col border-solid border-2 border-black border-opacity-50 text-center content-center bg-white z-50 items-center justify-around";
            pictureDiv.className += "pictureDiv border-solid border-2 border-black border-opacity-50 w-10/12 h-3/4";

            container.prepend(cardRecipe);
            cardRecipe.appendChild(title);
            title.appendChild(titleText);
            cardRecipe.appendChild(pictureDiv);
        }

    }

    recipe.forEach(element => {
        var recipeValid = new Recipes(element.recipeId, element.name, element.ingredients, element.url, element.http)
        console.log(element)
        recipeValid.create();
    })

});