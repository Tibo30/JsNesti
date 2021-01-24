// Attach a click event to the document
document.addEventListener("DOMContentLoaded", function() {

    // Get the valid recipes list that has been save in the local store (parse to JSON)
    var recipe = JSON.parse(localStorage.getItem("validRecipes"));

    // For each element in the JSON, create a card (with the constructor)
    recipe.forEach(element => {
        var recipeValid = new CardRecipes(element.recipeId, element.name, element.ingredients, element.url, element.http)
        console.log(element)
        recipeValid.createRecipeCards();
    })

});