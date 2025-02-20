import { clickCard, items, selectCards, startGame } from "./memory.js";

var game = $('#game');
var cards = [];

selectCards();

items.forEach(function(value, indx){
    cards.push(addAndGet(indx));
    bindClickEvent(indx);
    setValue(indx, value);
});

startGame();

function addAndGet(id){ 
    game.append(`<img id="${id}" title="card">`);
    return $(`#${id}`);
}

function bindClickEvent(indx){
    cards[indx].on('click', function (){
        clickCard(indx);
    });
}

export function setValue(indx, value){
    cards[indx].attr("src", value);
}

