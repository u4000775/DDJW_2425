import {setValue} from "./game.js";
const back = '../resources/back.png';
const resources = ['../resources/cb.png', '../resources/co.png',
                '../resources/sb.png', '../resources/so.png',
                '../resources/tb.png', '../resources/to.png'
            ];

export var items = [];
var disabled = [];
var game = {
    lastCard: null,
    allowedErrors: 3,
    pairs: 2,
    score: 200
}

export function selectCards(){
    items = resources.slice();          // Copiem l'array recources
    shuffe(items);                      // Barregem les cartes
    items = items.slice(0, game.pairs); // Agafem N elements (Parelles de cartes)
    items = items.concat(items);        // Dupliquem l'array
    shuffe(items);                      // Barregem el resultat
} 

export function startGame (){
    items.forEach(function(_,indx){
        disabled[indx] = true;
        setTimeout(function (){
            setValue(indx, back);
            disabled[indx] = false;
        }, 1000 + 100 * indx);
    });
}

export function clickCard(indx){
    if (disabled[indx]) return;
    disabled[indx] = true;
    setValue(indx, items[indx]);
    if (game.lastCard===null) // Primera carta clicada
        game.lastCard = indx;
    else{ // Teníem carta prèvia
        if (items[game.lastCard] === items[indx]) {
            game.pairs--;
            if (game.pairs <= 0) {
                alert(`Has guanyat amb ${game.score} punts!`);
                window.location.assign("../");
            }
        }
        else {
            setValue(indx, back);
            setValue(game.lastCard, back);
            disabled[indx] = disabled[game.lastCard] = false;
            game.score -= 25;
            game.allowedErrors--;
            if (game.allowedErrors < 0){
                alert ("Has perdut");
                window.location.assign("../");
            }
        }
        game.lastCard = null;
    }
}

function shuffe(arr){
    arr.sort(function(){return Math.random() - 0.5});
}