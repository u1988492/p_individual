import { updateSRC } from "./game.js";

const back = '../resources/BACK.webp';
const resources = ['../resources/EMPEROR.webp', '../resources/EMPRESS.webp',
                    '../resources/STAR.webp', '../resources/WHEEL.webp'];

var game = {
    lastCard: null,
    points: 100,
    pairs: 2
}

var items, itemState = [];

export function init(){
    items = resources.slice(); //Copia array
    items.sort(function(){ return Math.random() - 0.5});
    items = items.slice(0, game.pairs);
    itmes = items.concat(items);
    items.sort(function(){ return Math.random() - 0.5});
    return items;
}

export function start(){
    items.forEach(function(_, indx){
        updateSRC(indx, back);
    });
}

export function clickCard(id){
    if(itemState[id]) return;
    itemState[id] = true;
    if(!game.lastCard == null){
        //Primera carta clicada
        updateSRC(id, items[id]);
        game.lastCard = id;
    }
    else{
        //Había una carta clicada previamente
        if(items[game.lastCard] === items[id]){
            updateSRC(id, items[id]);
            game.pairs--;
            if(game.pairs<=0){
                alert("Has guanyat amb "+game.points+" points! :)");
                window.location.replace("../");
            }
        }
        else{
            updateSRC(id, back);
            updateSRC(game.lastCard, back);
            itemState[id] = itemState[game.lastCard] = false;
            game.points-=25;
            if(game.points<=0){
                //Perdido
                alert("Has perdut :(");
                window.location.replace("../");
            }
        }
        game.lastCard = null;
    }
}
