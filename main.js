var colors = [
    '30BA8F',
    'FDEE00',
    '00CCFF',
    '00CED1',
    'FF5349',
    'DFFF00',
    '9370DB',
    'FF62B0',
    '446CCF',
    'FF6700',
    'BE4F62',
    'FF9966'
]

var cardsArray = [];
for (var i = 0; i < colors.length; i++) {
    cardsArray.push(colors[i]);
    cardsArray.push(colors[i]);
};
console.log(cardsArray);

Array.prototype.shuffleMePlease = function(){
    var i = this.length;
    var rand;
    var randPosition;
        while (--i > 0){
            rand = Math.floor(Math.random() * (i+1));
            randPosition = this[rand];
            this[rand] = this[i];
            this[i] = randPosition;
        }
    return this;
};

var letsCountIfGameIsOver = 0;
var areThisTwoSameColor = [];
var doesTheseHaveSameId = [];
var howManyTimesIWinThisThing = 0;

var whenColorIsClicked = function(div, contentOfIndex){
    if (areThisTwoSameColor.length < 2){
    div.style.backgroundColor = '#'+contentOfIndex;
        if (areThisTwoSameColor.length === 0){
            areThisTwoSameColor.push(contentOfIndex);
            doesTheseHaveSameId.push(div.id);
        } else if (areThisTwoSameColor.length === 1){
            areThisTwoSameColor.push(contentOfIndex);
            doesTheseHaveSameId.push(div.id);
            var firstCircle = doesTheseHaveSameId[0];
            var secondCircle = doesTheseHaveSameId[1];
            if (areThisTwoSameColor[0] === areThisTwoSameColor[1] && firstCircle !== secondCircle){
                areThisTwoSameColor = [];
                letsCountIfGameIsOver += 2;
                var pairsFound = {
                                2: 'One Pair Found',
                                4: 'Two Pairs Found',
                                6: 'Three Pairs Found',
                                8: 'Four Pairs Found',
                                10: 'Five Pairs Found',
                                12: 'Six Pairs Found',
                                14: 'Seven Pairs Found',
                                16: 'Eight Pairs Found',
                                18: 'Nine Pairs Found',
                                20: 'Ten Pairs Found',
                                22: 'One More to Win',
                                24: 'Play Again?'
                                };
                for (var i in pairsFound){
                    if ([i] == letsCountIfGameIsOver){
                        document.querySelector('button').textContent = ''+ pairsFound[i];
                        console.log(pairsFound[i]);
                    }
                }
                var letsDesapear = function (){
                    document.getElementById(firstCircle).style.backgroundColor = 'transparent';
                    document.getElementById(secondCircle).style.backgroundColor = 'transparent';
                };
                setTimeout(letsDesapear, 400);
                doesTheseHaveSameId = [];
                if (cardsArray.length === letsCountIfGameIsOver){
                    document.getElementById('button-new-game').addEventListener("click", newGame);
                    howManyTimesIWinThisThing++
                    document.getElementById('button-new-game').textContent = 'Play Again'
                    document.getElementById('too-many-wins').textContent = "Wins: " + howManyTimesIWinThisThing;
                }
            } else {
                var ifItsNotAMatch = function(){
                    document.getElementById(firstCircle).style.backgroundColor = 'white';
                    document.getElementById(secondCircle).style.backgroundColor = 'white';
                };
                setTimeout(ifItsNotAMatch, 400);
                areThisTwoSameColor = [];
                doesTheseHaveSameId =[];
            }
        }
    }
};

var newGame = function(){
    document.getElementById('button-new-game').textContent = 'Look For Pairs of Colors'
    letsCountIfGameIsOver = 0;
    cardsArray.shuffleMePlease();
    if (document.getElementById("game-board")){
        document.body.removeChild(document.getElementById("game-board"));
    }
    var newGame = document.createElement("div");
    newGame.setAttribute("id", "game-board");
    document.body.appendChild(newGame);
    for (var i = 0; i < cardsArray.length; i++) {
        var newCard = document.createElement("div");
        newCard.setAttribute("class", "initial-color");
        newCard.setAttribute("id", "card-#" + i);
        newCard.setAttribute("onclick", "whenColorIsClicked(this, '" + cardsArray[i]+"')");
        document.getElementById("game-board").appendChild(newCard);
        console.log(newCard);
    }
    var counterOfTime = 120;
    document.getElementById('play-with-timer').textContent = "Play With Timer";
};
newGame();

var countdownFunction = function(){
    var counterOfTime = 120;
    var runMyTimer = function (){
        counterOfTime--;
        document.getElementById('play-with-timer').textContent = "Seconds Left: " + counterOfTime;
        if (cardsArray.length === letsCountIfGameIsOver){
            clearInterval(countingInterval);
            document.body.removeChild(document.getElementById("game-board"));
            document.body.addEventListener("keypress", newGame);
            document.getElementById('button-new-game').innerHTML = 'Strange Game is Won!';
        } else if (counterOfTime === 0 && counterOfTime < 1 ){
            clearInterval(countingInterval);
            document.body.removeChild(document.getElementById("game-board"));
            document.body.addEventListener("keypress", newGame);
            document.getElementById('button-new-game').textContent = 'Play Again?';
            return window.alert('Game Over!');
        }
    }
    var countingInterval = setInterval(runMyTimer, 1000);
}

document.getElementById('play-with-timer').addEventListener('click', countdownFunction);
