
//create all the variables
var score;
var cardsmatched;

var ui = $("#gameUI");
var uiIntro = $("#gameIntro");
var uiStats = $("#gameStats");
var uiComplete = $("#gameComplete");
var uiCards= $("#cards");
var uiReset = $(".gameReset");
var uiScore = $(".gameScore");
var uiPlay = $("#gamePlay");
var uiTimer = $("#timer");

//create deck array
var matchingGame = {};
matchingGame.deck = ['blueDino', 'blueDino','brownDino', 'brownDino','redDino', 'redDino','greenDino', 'greenDino','purpDino', 'purpDino','burgDino', 'burgDino',
'orangeDino', 'orangeDino','purp2Dino', 'purp2Dino','pinkDino', 'pinkDino',];

//on document load the lazy way
$(function(){
	  init();
});

//initialise game
function init() {
					uiComplete.hide();
					uiCards.hide();
					playGame = false;
					uiPlay.click(function(e) {
						e.preventDefault();
						uiIntro.hide();
						startGame();
					});
				
					uiReset.click(function(e) {
						e.preventDefault();
						uiComplete.hide();					
						reStartGame();
					});
			}

//start game and create cards from deck array
function startGame(){
				uiTimer.show();
				uiScore.html("0 seconds");
				uiStats.show();
				uiCards.show();
				score = 0;
				cardsmatched = 0;
			   	if (playGame == false) {
			   			playGame = true;
						matchingGame.deck.sort(shuffle);
						for(var i=0;i<17;i++){
								$(".card:first-child").clone().appendTo("#cards");
							}
							// initialize each card's position
							uiCards.children().each(function(index) {
								// align the cards to be 3x6 ourselves.
								$(this).css({
									"left" : ($(this).width() + 20) * (index % 6),
									"top" : ($(this).height() + 20) * Math.floor(index / 6)
								});
								// get a pattern from the shuffled deck
								var pattern = matchingGame.deck.pop();
								// visually apply the pattern on the card's back side.
								$(this).find(".back").addClass(pattern);
								// embed the pattern data into the DOM element.
								$(this).attr("data-pattern",pattern);
								// listen the click event on each card DIV element.
								$(this).click(selectCard);
							});											 
				   	timer();
				};			   
			  }


//timer for game
function timer() {
				//alert("timer set")
				if (playGame) {
					scoreTimeout = setTimeout(function() {
						uiScore.html(++score + " seconds");		
						timer();
					}, 1000);
				};
		};

//shuffle cards
function shuffle() {
	return 0.5 - Math.random();
}

//onclick function add flip class and then check to see if cards are the same
function selectCard() {
	// we do nothing if there are already two cards flipped.
	if ($(".card-flipped").size() > 1) {
	return;
	}
	$(this).addClass("card-flipped");
	// check the pattern of both flipped card 0.7s later.
	if ($(".card-flipped").size() == 2) {
	setTimeout(checkPattern,700);
	}
}

//if pattern is same remove cards otherwise flip back
function checkPattern() {
	if (isMatchPattern()) {
		$(".card-flipped").removeClass("card-flipped").addClass("card-removed");
			if(document.webkitTransitionEnd){
				$(".card-removed").bind("webkitTransitionEnd",	removeTookCards);
			}else{
				removeTookCards();
			}
		} else {
		$(".card-flipped").removeClass("card-flipped");
	}
}

//put 2 flipped cards in an array then check the image to see if it's the same.
function isMatchPattern() {
	var cards = $(".card-flipped");
	var pattern = $(cards[0]).data("pattern");
	var anotherPattern = $(cards[1]).data("pattern");
	return (pattern == anotherPattern);
}

//check to see if all cardmatched variable is less than 8 if so remove card only otherwise remove card and end game 
function removeTookCards() {
	if (cardsmatched < 8){
		cardsmatched++;
		$(".card-removed").remove();
	}else{
		$(".card-removed").remove();
		uiCards.hide();
		uiComplete.show();
		clearTimeout(scoreTimeout);
	}	
}

//recreate the original card , stop the timer and re populate the array with class names
function reStartGame(){
				playGame = false;
				uiCards.html("<div class='card'><div class='face front'></div><div class='face back'></div></div>");
				clearTimeout(scoreTimeout);
				matchingGame.deck = ['blueDino', 'blueDino','brownDino', 'brownDino','redDino', 'redDino','greenDino', 'greenDino','purpDino', 'purpDino','burgDino', 'burgDino',
'orangeDino', 'orangeDino','purp2Dino', 'purp2Dino','pinkDino', 'pinkDino',];			
				startGame();
			}
				