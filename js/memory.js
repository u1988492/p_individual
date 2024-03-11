export var game = function(){
    const back = '../resources/BACK.webp';
    const resources = ['../resources/EMPEROR.webp', '../resources/EMPRESS.webp',
                    '../resources/STAR.webp', '../resources/WHEEL.webp', '../resources/CHARIOT.webp', '../resources/FOOL.webp',
                    '../resources/HANGEDMAN.webp', '../resources/TOWER.webp', '../resources/HERMIT.webp', '../resources/HIEROPHANT.webp'];
    const card = {
        current: back,
        clickable: true,
        goBack: function() {
            setTimeout(() => {
                this.current = back;
                this.clickable = true;
                this.callback();
            }, 1000);
        },
        goFront: function () {
            this.current = this.front;
            this.clickable = false;
            this.callback();

        }
    };

    //condiciones de puntos y tiempo para dificultad

    var options = JSON.parse(localStorage.options||JSON.stringify(default_options));
    var lastCard;
    var pairs = options.pairs;
    var points = 100;

    /*if(options.difficulty==easy){

    }
    else if(options.difficulty==normal){

    }
    else if(options.difficulty==hard){

    }
    */

    return{
        init: function (call){
            var items = resources.slice(); //Copia array
            items.sort(()=> Math.random() - 0.5);
            items = items.slice(0, pairs);
            items = items.concat(items);
            items.sort(()=> Math.random() - 0.5);
            return items.map(item => Object.create(card, {front: {value:item}, callback: {value:call}}));
        },
        click: function(card){
            if(!card.clickable) return;
            card.goFront();
            if(lastCard){
                if(card.front === lastCard.front){
                    pairs--;
                    if(pairs <= 0){
                        alert("Has guanyat amb "+points+" punts! :)");
                        window.location.replace("../");
                    }
                }
                else{
                    [card, lastCard].forEach(c=>c.goBack());
                    points-=25;
                    if(points<=0){
                        alert("Has perdut :(");
                        window.location.replace("../");
                    }
                }
                lastCard = null;
            }
            else lastCard = card;
        }
    }
}();
