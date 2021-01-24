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
        var linkRecipe = document.createElement("a");
        var cardRecipe = document.createElement("div");
        var title = document.createElement("p");
        var icon = document.createElement("img");
        var titleText = document.createTextNode(this.name);
        var pictureDiv = document.createElement("div");
        pictureDiv.style["background-image"] = "url(assets/pictures/" + this.url + ")";

        // Add style in the various div
        container.className = "relative m-auto flex flex-row flex-wrap justify-center items-center";
        cardRecipe.className += "cardRecipe relative flex flex-col border-solid border-2 border-black border-opacity-50 text-center content-center bg-white z-50 items-center justify-around m-6";
        pictureDiv.className += "pictureDiv border-solid border-2 border-black border-opacity-50 w-10/12 h-3/4";

        container.prepend(linkRecipe);
        linkRecipe.prepend(cardRecipe);
        cardRecipe.appendChild(title);
        title.appendChild(titleText);
        cardRecipe.appendChild(pictureDiv);
        cardRecipe.appendChild(icon);


        icon.src = "assets/pictures/icon-foreign.png";

        linkRecipe.id = this.recipeId;
        linkRecipe.href = this.http;

    }

}