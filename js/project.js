document.addEventListener("DOMContentLoaded", function () {
    class Cards {
        constructor(ingredientID, name, url) {
            this.ingredientID = ingredientID;
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
            var myObj = JSON.parse(this.responseText);
            console.log("test1");
            myObj.forEach(element => {
                console.log("test2");
                var card = new Cards(element.ingredientID, element.name, element.url)
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
        console.log(event.currentTarget);
        var currentCard = event.currentTarget.parentNode.parentNode;
        var cardNext = currentCard.previousSibling.previousSibling;
        var thirdCard = cardNext.previousSibling.previousSibling;
        var fourthCard = thirdCard.previousSibling.previousSibling;
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
        console.log(event.currentTarget.parentNode.parentNode);
        var currentCard = event.currentTarget.parentNode.parentNode;
        var cardNext = currentCard.previousSibling.previousSibling;
        var thirdCard = cardNext.previousSibling.previousSibling;
        var fourthCard = thirdCard.previousSibling.previousSibling;
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

/*
function htmlCode(){

    var textHtml = "";
    for (let i = 0; i < Object.keys(mydata).length; i++) {
        if (i == 0) {
            textHtml += "<div class=card currentCard>";
        } else if (i == 1) {
            textHtml += "<div class=card cardNext>";
        } else if (i == 1) {
            textHtml += "<div class=card thirdCard>";
        } else {
            textHtml += "<div class=card>";
        }
        textHtml += "<h4>" + mydata[i].name + "<img class=image src=" + mydata[i].url + " alt=Picture of a " + mydata[i].name + "><div class=buttons>< button class=btnLeft onclick = swipeLeft() > X < br > Swipe</button ><button class=btnRight onclick=swipeRight()> ✓ <br> Keep</button> </div></div > ";
    }
    document.querySelector("#containerCard").innerHTML = textHtml;
}







*/


