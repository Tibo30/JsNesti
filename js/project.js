document.addEventListener("DOMContentLoaded", function() {
    class Cards {
        constructor(ingredientID, name, url) {
            this.ingredientID = ingredientID;
            this.name = name;
            this.url = url;

        }

        create() {
            var containerCard = document.querySelector('#containerCard');
            var cardIngredient = document.createElement("div");
            var title = document.createElement("h4");
            var titleText = document.createTextNode(this.name);
            var pictureDiv = document.createElement("div");
            pictureDiv.style["background-image"] = "url(assets/pictures/" + this.url + ")";
            var buttonContainer = document.createElement("div");
            var buttonDislike = document.createElement("button");
            var iconDislike = document.createElement("i");
            var buttonLike = document.createElement("button");
            var iconLike = document.createElement("i");

            // Add style in the various div
            containerCard.className += "relative m-auto flex-col justify-center items-center";
            cardIngredient.className += "cardIngredient absolute flex flex-col border-solid border-1 border-black text-center content-center bg-white z-50 items-center justify-around";
            pictureDiv.className += "pictureDiv border-solid border-1 border-black w-10/12 h-3/4";
            buttonContainer.className += "buttonContainer flex justify-around w-full";

            // For the dislike button
            buttonDislike.className += "buttonDislike text-red-500 bg-white rounded-full relative text-6xl border-solid border-1 border-black ";
            iconDislike.className += "relative fa fa-times";

            // For the like button
            buttonLike.className += "buttonLike text-green-500 bg-white rounded-full relative text-6xl border-solid border-1 border-black";
            iconLike.className += "fa fa-heart";

            containerCard.prepend(cardIngredient);
            cardIngredient.appendChild(title);
            title.appendChild(titleText);
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

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            myObj.forEach(element => {
                var card = new Cards(element.ingredientID, element.name, element.url)
                card.create();
            });
            var right = document.querySelectorAll(".buttonLike");
            right.forEach(element => {
                element.addEventListener('click', (e) => swipeRight())
            })

            var left = document.querySelectorAll(".buttonDislike");
            left.forEach(element => {
                element.addEventListener('click', (e) => swipeLeft())
            })
        }
    };
    xmlhttp.open("GET", "./js/ingredient.json", true);
    xmlhttp.send();

    function swipeLeft() {
        var currentCard = event.currentTarget.parentNode.parentNode;
        var cardNext = currentCard.previousSibling;
        var thirdCard = cardNext.previousSibling;
        var fourthCard = thirdCard.previousSibling;
        currentCard.classList.add("swipeLeft");
        cardNext.classList.add("currentCard");
        cardNext.classList.remove("cardNext");
        thirdCard.classList.add("cardNext");
        thirdCard.classList.remove("thirdCard");
        fourthCard.classList.add("thirdCard");
        fourthCard.classList.remove("cardNext");
        document.addEventListener('animationend', () => {
            currentCard.classList.remove("currentCard")
        });
    }

    function swipeRight() {
        var currentCard = event.currentTarget.parentNode.parentNode;
        var cardNext = currentCard.previousSibling;
        var thirdCard = cardNext.previousSibling;
        var fourthCard = thirdCard.previousSibling;
        currentCard.classList.add("swipeRight");
        cardNext.classList.add("currentCard");
        cardNext.classList.remove("cardNext");
        thirdCard.classList.add("cardNext");
        thirdCard.classList.remove("thirdCard");
        fourthCard.classList.add("thirdCard");
        fourthCard.classList.remove("cardNext");
        document.addEventListener('animationend', () => {
            currentCard.classList.remove("currentCard")
        });
    }
});