import { Pokemon } from './classes.js'
import { Button, Battle } from './button.js'

const pokemonForm = document.querySelector('#choosePokemon');
const confirm = document.querySelector('.confirm')
const submit = document.querySelector('#submit')
const finalSubmit = document.querySelectorAll('.finalsubmit')
const title = document.querySelector('h3')
const finalcancel = document.querySelector('#finalcancel')
const finalSubmitButton = document.querySelector('#finalsubmit')
const pokemonBase = "https://pokeapi.co/api/v2/pokemon";
const input = pokemonForm.elements.pokeName;
var pokemonData;
var computerData;
var p1MoveMade = false;

var p1;
var computer;

const buttonArray = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

pokemonForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  try {
    input.value = input.value.toLowerCase()
    const url = `${pokemonBase}/${input.value}`
    pokemonData = await fetchUrl(url);
    confirmPokemon(pokemonData.sprites.front_default);
  } catch (e) {
    input.value = ''
    title.textContent = "Invalid Pokemon"
  }
});

//cnacels pokemon choice and returns back to beginning UI
finalcancel.addEventListener('click', (e) => {
  submit.style.display = 'inline-block';
  input.style.display = 'inline-block';
  const deletePoke = document.querySelector('.menuPoke')
  deletePoke.remove()
  finalSubmit.forEach((button) => button.style.display = 'none')
  input.value = '';
  title.textContent = "Choose Your Pokemon"
})

//generates objects for player and computer. proceeds with the pokemon battle
finalSubmitButton.addEventListener('click', async e => {
  let pokemon = input.value
  if (pokemon) {
    p1 = new Pokemon(pokemon);
    await p1.updateInfo()

    const pokeNum = Math.floor(Math.random() * 800) + 1;
    computer = new Pokemon(pokeNum);
    await computer.updateInfo()

    loadBattle()
  
    createMoveButtons()
    await waitForGameOver()
    console.log('gameover')

  }
})

function loadBattle() {
  document.body.innerHTML = '';
  document.body.innerHTML = Battle(100,100);
}

function createMoveButtons(){
  for(let i = 0; i <= 3; i++) {
    buttonArray[i] = document.createElement('button')
    buttonArray[i].classList.add('btn')
    buttonArray[i].classList.add('btn-secondary')
    buttonArray[i].textContent = p1.getMoves()[i].move;
    document.body.append(buttonArray[i])

    buttonArray[i].addEventListener('click', function () {
      computer.updateHealth(p1.getDamage(i))
      console.log("Computer Health",computer.getHealth())
      p1MoveMade = true; //do this after all the data is changed
    })
  }

}

//final UI to confirm the pokemon choice
function confirmPokemon(sprite) {
  const img = document.createElement('img')
  img.src = sprite;
  img.classList.add("menuPoke")
  confirm.append(img)
  submit.style.display = 'none';
  input.style.display = 'none';
  title.textContent = "Choose This Pokemon?";
  finalSubmit.forEach((button) => button.style.display = 'block')
}


async function fetchUrl(url, requestOptions = null) {
  let res;
  if (!requestOptions && url) {
    const res = await fetch(url)
    const data = await res.json();
    return data;

  } else {
    res = await fetch(url, requestOptions)
  }
  return res.json()
}


//waits for P1 to make a response
function waitForP1() {
  return new Promise(function (resolve, reject) {
    (function waitForChoice() {
      if (p1MoveMade) {
        console.log("player made move")
        p1MoveMade = false; //reset for next turn
        return resolve("P1 move choice, or P1 data or something");
      }
      setTimeout(waitForChoice, 30);
    })();
  });
}



//Simulate 
function waitForGameOver() {
  try{
    console.log('in here')
    return new Promise(function (resolve, reject) {
      (async function waitForGame() {
        console.log("waiting for player")
        await waitForP1();
        // update computer health with damage
        if(computer.getHealth() <= 0) return resolve();
        let move = getRandomInt(4)
        p1.updateHealth(computer.getDamage(move))
        console.log("Player Health:",p1.getHealth())
        if(p1.getHealth() <= 0) return resolve();
        setTimeout(waitForGame, 30);
      })();
    });
  }catch(e){
    console.log(e)
  }
}




//BATTLE FLOW
//waitForGameOver() function is called to start the game
//ALL OF THIS IS IN waitForTrue down below
//TRUE 
//TURN FLOW
//then P1 turn starts 
//Player one chooses one of 4 attacks. 
//Pokemon.attack -> Opposite Player 
//Damage from Opposite Player
//Life bar decreases per attack 
//Boolean Flag to indicate whos turn it is :)
//TRUE you false/pc 
//Trigger function onclick
//After Attack is finished trigger bool for PC turn. 
//PC randomly chooses 1-4 attacks and repeat until Game over ? 
//State of application
//Data


//FLOW TWO
//players turn
//render buttons -> render id="moveName"
//player clicks button, onlick saves the player choice/move, damage = p1.getDamage(), computer.updateHealth(damage)
//Switch TURN 
// then comp chooses 0-3 attacks
// attacks -> flag
//attacks changes the state.



//call another waitForPlayer function to wait to see what player chooses
  //player clicks a button, label buttons 0-3?, corresponds with moves?
  //get move and attacks computer with that move, computer.updateHealth(damage)
  //checks if health is below zero or not

//calls a computerTurn function that chooses random move and executes its attacks 
  //calc random num 0-3, let damage = computer.getMoves[rand].damage
  //p1.updateHealth(damage), and checks if health is below zero or not


//repeats until someones health is below zero, gameOver = true; return gameOver;
//waitForTrue function is resolved.
//can output winner and loser screen? or just end there 