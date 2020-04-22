const gameContainer = document.getElementById('game');
let guesses = 0;
let rightguesses = 0;
const guess = document.querySelector('#guess');
const rightguess = document.querySelector('#rightguess');
const highscore = document.querySelector('#highscore');
let reassginvalue = 12;
const COLORSALL = [ 'red', 'red', 'blue', 'blue', 'green', 'green', 'orange', 'orange', 'purple', 'purple','pink','pink','yellow','yellow','black','black' ];
var COLORS = COLORSALL.slice(0,8);

function reassigncolorarray(num, COLORS) {
	if (num <= COLORS.length) {
		return COLORS.slice(0, num);
	} else {
		let result = [];
		while (num > COLORS.length) {
			num -= COLORS.length;
			result = result.concat(COLORS);
		}
		result = result.concat(COLORS.slice(0, num));
		return result;
	}
}

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
	let counter = array.length;

	// While there are elements in the array
	while (counter > 0) {
		// Pick a random index
		let index = Math.floor(Math.random() * counter);

		// Decrease counter by 1
		counter--;

		// And swap the last element with it
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}

	return array;
}

let shuffledColors = shuffle(reassigncolorarray(12, COLORS));

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
	for (let color of colorArray) {
		// create a new div
		const newDiv = document.createElement('div');

		// give it a class attribute for the value we are looping over
		newDiv.classList.add(color);
		newDiv.classList.add('flipCard');
		let newDivchild1 = document.createElement('div');
		newDivchild1.classList.add('card');
		let newDivchild2 = document.createElement('div');
		newDivchild2.classList.add('side', 'front');
		let newDivchild3 = document.createElement('div');
		newDivchild3.classList.add('side', 'back');
		
		newDivchild1.appendChild(newDivchild2);
		newDivchild1.appendChild(newDivchild3);
		newDiv.appendChild(newDivchild1);
		// call a function handleCardClick when a div is clicked on
		//newDiv.addEventListener("click", handleCardClick);

		// append the div to the element with an id of game
		gameContainer.append(newDiv);
	}
}

// TODO: Implement this function!
var selected1 = 0;
var selected2 = 0;
let randomcolor = {
	red: "./imagelibrary/dog1.jpg",
	blue: "./imagelibrary/dog2.jpg",
	green: "./imagelibrary/cat1.jpg",
	orange: "./imagelibrary/cat2.jpg",
  purple: "./imagelibrary/ghoat1.jpg",
  pink: "./imagelibrary/ghoat2.jpg",
  yellow: "./imagelibrary/panda1.jpg",
  black: "./imagelibrary/panda2.jpg",
};
function handleCardClick(event) {
	// you can use event.target to see which element was clicked
	console.log('you just clicked', event.target);
	if (!selected1) {
		selected1 = event.target;
		selected1.parentElement.setAttribute('data-selected', true);
		selected1.nextElementSibling.style.backgroundImage = `url('${randomcolor[selected1.parentElement.parentElement.classList[0]]}')`;
		selected1.parentElement.classList.toggle('flipped');
	} else if (!selected2) {
		selected2 = event.target;
		if(selected2.classList.contains("card")){
			selected2 = selected2.children[0];
		}else if(selected2.classList.contains("back")){
			selected2 = selected2.previousElementSibling
		}
		if(!selected2.parentElement.hasAttribute('data-selected')){
			selected2.nextElementSibling.style.backgroundImage =  `url('${randomcolor[selected2.parentElement.parentElement.classList[0]]}')`;
		    selected2.parentElement.classList.toggle('flipped')
		}
		
		if (selected2.parentElement.hasAttribute('data-selected') || selected1.parentElement.parentElement.classList[0] !== selected2.parentElement.parentElement.classList[0]) {
			removeallselected();
			guesses++;
			guess.innerText = 'Guesses made so far: ' + guesses;
		} else {
			selected1.removeAttribute('data-selected');
			selected1 = 0;
			selected2 = 0;
			guesses++;
			rightguesses++;
			guess.innerText = 'Guesses made so far: ' + guesses;
			rightguess.innerText = 'Right guesses made so far: ' + rightguesses;
			if (rightguesses > JSON.parse(localStorage.highscore)) {
				localStorage.highscore = JSON.stringify(rightguesses);
			}
		}
	}
}

function removeallselected() {
	if (selected1 && selected2) {
		setTimeout(function() {
			if(selected1 === selected2){
				selected1.parentElement.classList.toggle('flipped');
			}
			else{
				selected1.parentElement.classList.toggle('flipped');
                selected2.parentElement.classList.toggle('flipped')
			}
			selected1.removeAttribute('data-selected');
			selected1 = 0;
			selected2 = 0;
		}, 1000);
	}
}
// when the DOM loads
createDivsForColors(shuffledColors);

//Start the game only when click on start
const start = document.querySelector('#start');
start.addEventListener('click', function() {
	let divs = gameContainer.children;
	for (div of divs) {
		div.addEventListener('click', handleCardClick);
	}
});

//Restart the game when click on restart
const restart = document.querySelector('#restart');
restart.addEventListener('click', function() {
	shuffledColors = shuffle(reassigncolorarray(reassginvalue, COLORS));
	gameContainer.innerHTML = '';
	createDivsForColors(shuffledColors);
	guesses = 0;
	rightguesses = 0;
	guess.innerText = 'Guesses made so far: ' + guesses;
	rightguess.innerText = 'Right guesses made so far: ' + rightguesses;
	start.click();
});

//localstorage for highest score
document.addEventListener('DOMContentLoaded', function() {
	if (window.localStorage.highscore) {
		highscore.innerText = 'Highest score: ' + JSON.parse(localStorage.highscore);
	} else {
		localStorage.setItem('highscore', '0');
	}
	start.click();
});

//form to assign scale
const form = document.querySelector('form');
const mapsize = document.querySelector('#mapsize');
const gamemode = document.querySelector('#gamemode');
form.addEventListener('submit', function(e) {
	e.preventDefault();
  reassginvalue = 8 + mapsize.value * 4;
  COLORS = COLORSALL.slice(0,gamemode.value*4+4);
	shuffledColors = shuffle(reassigncolorarray(reassginvalue, COLORS));
	gameContainer.innerHTML = '';
	createDivsForColors(shuffledColors);
	guesses = 0;
	rightguesses = 0;
	guess.innerText = 'Guesses made so far: ' + guesses;
	rightguess.innerText = 'Right guesses made so far: ' + rightguesses;
	
	start.click();
});
