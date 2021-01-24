document.addEventListener("DOMContentLoaded", function() {
    var recipe = JSON.parse(localStorage.getItem("validRecipes"));

    recipe.forEach(element => {
        var recipeValid = new Recipes(element.recipeId, element.name, element.ingredients, element.url, element.http)
        console.log(element)
        recipeValid.create();
    })

});