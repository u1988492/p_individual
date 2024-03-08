import { clickCard, init, start } from "./memory.js";

//Obtener elementos
var game = $("#game");
var cards = [];

init().forEach(function(_, indx){
    game.append('<img id="c'+indx+'" title="card>');
    var c = $('#c'+indx);
    c.on('click', function(){clickCard(indx)});
    cards.push(c);
});

start();

export function updateSRC(indx, value){
    cards[indx].attr("src", value);
}