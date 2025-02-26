import { game as gController } from "./memory.js";
var game = $('#game');
gController.selectCards(setValue).forEach((card, indx)=>{
    let c = addAndGet(indx);
    card.pointer = c;
    bindClickEvent(card);
    setValue(card);
});

function addAndGet(id){ 
    game.append(`<img id="${id}" title="card">`);
    return $(`#${id}`);
}

function bindClickEvent(card){
    card.pointer.on('click', () => gController.clickCard(card));
}
function setValue(card){
    card.pointer.attr("src", card.current);
}

