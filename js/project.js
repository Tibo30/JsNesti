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
            var cont = document.querySelector('#containerCard');
            var cardContent = document.createElement("div");
            var title = document.createElement("h4");
            var titleText = document.createTextNode(this.name);
            var picture = document.createElement("img");
            picture.src = "./assets/pictures/" + this.url;
            var button = document.createElement("div");
            var buttonDislike = document.createElement("button");
            var buttonLike = document.createElement("button");
            buttonDislike.innerHTML = " X  <br> Swipe";
            buttonLike.innerHTML = " ✓  <br> Keep"
            // rajouter nom de l'ingrédient en ID et faire un if dans les fonctions right et left à partir de l'avant avant avant dernier élément
            cardContent.className += "card";
            cardContent.id += this.ingredientId;
            if (this.ingredientId == 1) {
                cardContent.className += " currentCard";
            } else if (this.ingredientId == 2) {
                cardContent.className += " cardNext";
            } else if (this.ingredientId == 3) {
                cardContent.className += " thirdCard";
            }
            picture.className += "image";
            button.className += "buttons";
            buttonDislike.className += "btnLeft";
            buttonLike.className += "btnRight";

            cont.prepend(cardContent);
            cardContent.appendChild(title);
            title.appendChild(titleText);
            cardContent.appendChild(picture);
            cardContent.appendChild(button);
            button.appendChild(buttonDislike);
            button.appendChild(buttonLike);

        }

    }
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);
            myObj.forEach(element => {
                var card = new Cards(element.ingredientId, element.name, element.url)
                card.create();
            });
            var right = document.querySelectorAll(".btnRight");
            right.forEach(element => {
                element.addEventListener('click', (e) => swipeRight())
            })

            var left = document.querySelectorAll(".btnLeft");
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
           console.log(rightList);
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



