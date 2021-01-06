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



    function swipeLeft() {
        var card = window.event.target.parentNode.parentNode;
        var cardNext = card.nextSibling.nextSibling;
        var thirdCard = cardNext.nextSibling.nextSibling;
        var fourthCard = thirdCard.nextSibling.nextSibling;
        card.classList.add("swipeLeft");
        cardNext.classList.add("currentCard");
        cardNext.classList.remove("cardNext");
        thirdCard.classList.add("cardNext");
        thirdCard.classList.remove("thirdCard");
        fourthCard.classList.add("thirdCard");
        fourthCard.classList.remove("cardNext");
        document.addEventListener('animationend', () => {
            card.classList.remove("currentCard")
        });
    }

function swipeRight() {
    var card = window.event.target.parentNode.parentNode;
    var cardNext = card.nextSibling.nextSibling;
    var thirdCard = cardNext.nextSibling.nextSibling;
    var fourthCard = thirdCard.nextSibling.nextSibling;
    card.classList.add("swipeRight");
    cardNext.classList.add("currentCard");
    cardNext.classList.remove("cardNext");
    thirdCard.classList.add("cardNext");
    thirdCard.classList.remove("thirdCard");
    fourthCard.classList.add("thirdCard");
    fourthCard.classList.remove("cardNext");
    document.addEventListener('animationend', () => {
        card.classList.remove("currentCard")
    });
}




