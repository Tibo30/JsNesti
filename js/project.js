document.addEventListener("DOMContentLoaded", function () {
    var myObj = [];
    var rightList=[];
    class Cards {
        constructor(ingredientId, name, url) {
            this.ingredientId = ingredientId;
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

          cardIngredient.id += this.ingredientId;
            if (this.ingredientId == 1) {
                cardIngredient.className += " currentCard";
            } else if (this.ingredientId == 2) {
                cardIngredient.className += " cardNext";
            } else if (this.ingredientId == 3) {
                cardIngredient.className += " thirdCard";
            }

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
            myObj = JSON.parse(this.responseText);
            myObj.forEach(element => {
                var card = new Cards(element.ingredientId, element.name, element.url)
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
        swipe("Left");
    }


    function swipeRight() {
        swipe("Right");
    }

    function swipe(leftOrRight){
        var currentCard = event.currentTarget.parentNode.parentNode;
        var cardNext;
        var thirdCard;
        var fourthCard;
        if (leftOrRight=="Right"){
           var ingredientAdd=currentCard.childNodes[0].textContent;
           rightList.push(ingredientAdd);
           console.log(rightList)
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
        var direction="swipe"+leftOrRight;
        currentCard.classList.add(direction);
        document.addEventListener('animationend', () => {
            currentCard.classList.remove("currentCard");
            currentCard.style.visibility="hidden";
        });

    }
});



