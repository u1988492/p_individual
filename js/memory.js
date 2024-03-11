export var game = function(){
    const back = '../resources/BACK.webp';
    const resources = ['../resources/EMPEROR.webp', '../resources/EMPRESS.webp',
                    '../resources/STAR.webp', '../resources/WHEEL.webp'];
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
    var lastCard;
    var pairs = 2;
    var points = 100;

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
