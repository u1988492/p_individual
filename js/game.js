import { game as gContrller } from "./memory.js";

var game = $('#game');

gContrller.init(updateSRC).forEach(function(card, indx)){
    game.append('<img id="c'+indx+'" title="card>');
    card.pointer = $('#c'+indx);
    card.pointer.on('click', () => gContrller.click(card));
    card.pointer.attr("src", card.current);
}

function updateSRC(){
    this.pointer.attr("src", this.current);
}