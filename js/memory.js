export let game = function (){
    const back = '../resources/back.png';
    const resources = ['../resources/cb.png', '../resources/co.png',
                    '../resources/sb.png', '../resources/so.png',
                    '../resources/tb.png', '../resources/to.png'
                ];
    const card = { 
        current: back,
        clickable: true,
        onChanged: function (){
            this.changeCallback(this);
        },
        goBack: function (){
            setTimeout(()=>{
                this.current = back;
                this.clickable = true;
                this.onChanged();
            }, 1000);
        },
        goFront: function (){
            this.current = this.front;
            this.clickable = false;
            this.onChanged();
        }
    }

    const shuffe = arr => arr.sort(function(){return Math.random() - 0.5});

    let lastCard = null;
    let allowedErrors = 3;
    let pairs = 2;
    let score = 200;

    return {
        selectCards: function (call){
            let items = resources.slice();      // Copiem l'array recources
            shuffe(items);                      // Barregem les cartes
            items = items.slice(0, pairs);      // Agafem N elements (Parelles de cartes)
            items = items.concat(items);        // Dupliquem l'array
            shuffe(items);                      // Barregem el resultat
            return items.map((item, indx) => {
                    let it = Object.create(card);
                    it.current = it.front = item;
                    it.changeCallback = call;
                    setTimeout(()=>it.goBack(), 100 * indx);
                    return it;
                });
        },
        clickCard: function (card){
            if (!card.clickable) return;
            card.goFront();
            if (!lastCard)          // Primera carta clicada
                lastCard = card;
            else {                  // Teníem carta prèvia
                if (card.front === lastCard.front){
                    pairs--;
                    if (pairs <= 0){
                        alert(`Has guanyat amb ${score} punts!`);
                        window.location.assign("../");
                    }
                }
                else {
                    [card, lastCard].forEach(c=>c.goBack());
                    score-=25;
                    allowedErrors--;
                    if (allowedErrors < 0){
                        alert ("Has perdut");
                        window.location.assign("../");
                    }
                }
                lastCard = null;
            }
        }
    };
}();

