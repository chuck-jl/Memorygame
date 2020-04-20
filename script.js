const gameContainer = document.getElementById("game");
let guesses = 0;
let rightguesses = 0;
const guess = document.querySelector("#guess");
const rightguess = document.querySelector("#rightguess");
const highscore = document.querySelector("#highscore");
let reassginvalue = 10;

const COLORS = [
  "red","red",
  "blue","blue",
  "green","green",
  "orange","orange",
  "purple","purple"
];

function reassigncolorarray(num, COLORS){
  
  if(num<=COLORS.length){
    return COLORS.slice(0,num);
  }else{
    let result = [];
    while(num>COLORS.length){
      num-=COLORS.length;
      result = result.concat(COLORS);
    }
    result = result.concat(COLORS.slice(0,num));
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

let shuffledColors = shuffle(reassigncolorarray(10, COLORS));

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {

  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    //newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
var selected1 = 0;
var selected2 = 0;
let randomcolor= {
  red: `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`,
  blue: `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`,
  green: `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`,
  orange: `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`,
  purple: `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`
}
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  if(!selected1){
    selected1 = event.target;
    selected1.setAttribute("data-selected",true);
    selected1.style.backgroundColor = randomcolor[selected1.classList[0]];
  }else if(!selected2){
    selected2 = event.target;
    selected2.style.backgroundColor = randomcolor[selected2.classList[0]];
    if(selected2.hasAttribute("data-selected")||selected1.classList[0]!==selected2.classList[0]){
      removeallselected();
      guesses++;
      guess.innerText = "Guesses made so far: "+ guesses;
    }else{
      selected1.removeAttribute("data-selected");
      selected1 = 0;
      selected2 = 0;
      guesses++;
      rightguesses++;
      guess.innerText = "Guesses made so far: "+ guesses;
      rightguess.innerText = "Right guesses made so far: "+rightguesses;
      if(rightguesses>JSON.parse(localStorage.highscore)){
        localStorage.highscore = JSON.stringify(rightguesses);
      }
    }
    
  }
  
  
}

function removeallselected(){
  if(selected1 && selected2){
    setTimeout(function(){
      selected1.style.backgroundColor = "";
      selected1.removeAttribute("data-selected");
      selected1 = 0;
      selected2.style.backgroundColor = "";
      selected2 = 0;
   },1000)
  }
}
// when the DOM loads
createDivsForColors(shuffledColors);

//Start the game only when click on start
const start = document.querySelector("#start");
start.addEventListener("click",function(){
  let divs = gameContainer.children;
  for(div of divs){
    div.addEventListener("click", handleCardClick);
  }
})

//Restart the game when click on restart
const restart = document.querySelector("#restart");
restart.addEventListener("click",function(){
  shuffledColors = shuffle(reassigncolorarray(reassginvalue, COLORS));
  gameContainer.innerHTML="";
  createDivsForColors(shuffledColors);
  guesses = 0;
  rightguesses = 0;
  guess.innerText = "Guesses made so far: "+ guesses;
  rightguess.innerText = "Right guesses made so far: "+rightguesses;
})

//localstorage for highest score
document.addEventListener("DOMContentLoaded",function(){
  if(window.localStorage.highscore){
    highscore.innerText = "Highest score: "+JSON.parse(localStorage.highscore);
  }
})

//form to assign scale
const form = document.querySelector("form");
const scale = document.querySelector("#scale");
form.addEventListener("submit",function(e){
  e.preventDefault();
  if(scale.value<=0 || scale.value%2!=0){
    alert("The input is invalid, it has to be an even number greater than 2")
  }else{
    reassginvalue=scale.value;
    shuffledColors = shuffle(reassigncolorarray(reassginvalue, COLORS));
    gameContainer.innerHTML="";
    createDivsForColors(shuffledColors);
    guesses = 0;
    rightguesses = 0;
    guess.innerText = "Guesses made so far: "+ guesses;
    rightguess.innerText = "Right guesses made so far: "+rightguesses;
  }

})