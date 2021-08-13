import { Pokemon } from './classes.js'
import { Button, Battle } from './button.js'


const poketest = document.querySelector('#pokeName')
const confirm = document.querySelector('.confirm')
const submit = document.querySelector('#submit')
const finalSubmit = document.querySelectorAll('.finalsubmit')
const title = document.querySelector('h3')
const finalcancel = document.querySelector('#finalcancel')
const finalSubmitButton = document.querySelector('#finalsubmit')
const pokemonBase = "https://pokeapi.co/api/v2/pokemon";
var bool = false
var pokemonData;
var computerData;
var p1MoveMade = false;
var msg;
var p1;
var computer;
const buttonArray = [];
var input = document.querySelector('#pokeName');
input.addEventListener('input', submitPokemon)



function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


async function submitPokemon(e) {
  if (input.value.length > 1) {
    $(document).keydown(function (event) {
      //proper indentiation of keycode and which to be equal to 13.
      if ((event.keyCode || event.which) === 13 && !bool){
        bool = true
        $("#submit").trigger('click');
      }
    });

  }
  else {
    title.textContent = "Invalid Pokemon"
  }
}




$('#submit').on('click', async function (e) {
  try{
  input.value = input.value.toLowerCase()
  const url = `${pokemonBase}/${input.value}`
  pokemonData = await fetchUrl(url);
  confirmPokemon(pokemonData.sprites.front_default);
}catch(e){
  input.value = ""
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
finalSubmitButton.addEventListener('click', renderInput)
finalSubmitButton.addEventListener('touchend', renderInput)

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


function loadBattle() {
  document.body.innerHTML = '';
  document.body.style.background = "grey url(images/pokemonbattle.png) no-repeat top"
  document.body.style.backgroundSize = "cover";
  document.body.innerHTML = Battle(p1.getHealth(), computer.getHealth(), p1.sprite, computer.pokeInfo.sprites.front_default, p1.pokemon, computer.pokemon)
  msg = document.querySelector('#msg')
}

function createMoveButtons() {
  for (let i = 0; i <= 3; i++) {
    let button = document.querySelector(`#button${i}`)
    buttonArray[i] = button;
    button.textContent = p1.getMoves()[i].move;

    button.addEventListener('click', function () {
      playerAttack(i)
    })
  }
}

async function renderInput() {
  let pokemon = input.value
  if (pokemon) {
    p1 = new Pokemon(pokemon);
    console.log(p1)
    await p1.updateInfo()

    const pokeNum = Math.floor(Math.random() * 800) + 1;
    computer = new Pokemon(pokeNum);
    await computer.updateInfo()

    loadBattle()

    createMoveButtons()
    const result = await waitForGameOver()
    msg.textContent = `GAMEOVER! ${result}`
  }
}



function playerAttack(moveNum) {
  computer.updateHealth(p1.getDamage(moveNum))
  msg.textContent = `${p1.pokemon} used ${p1.getMoves()[moveNum].move}!`
  let computerHealth = document.querySelector(`#computerHealth`)
  computerHealth.textContent = computer.getHealth()
  computerHealth.style.width = `${computer.getHealth() / computer.getStartHealth() * 100}%`;
  p1MoveMade = true; //do this after all the data is changed
  console.log("Computer Health:", computer.getHealth())
}

function computerAttack() {
  let moveNum = getRandomInt(4)
  msg.textContent = `${computer.pokemon} used ${computer.getMoves()[moveNum].move}!`
  p1.updateHealth(computer.getDamage(moveNum))
  let p1Health = document.querySelector(`#p1Health`)
  p1Health.textContent = p1.getHealth()
  p1Health.style.width = `${p1.getHealth() / p1.getStartHealth() * 100}%`;
  console.log("Player Health:", p1.getHealth())
}


function disableButtons() {
  for (let i = 0; i <= 3; i++) {
    buttonArray[i].setAttribute('disabled', '')
  }
}

function enableButtons() {
  for (let i = 0; i <= 3; i++) {
    buttonArray[i].removeAttribute('disabled')
  }
}


//waits for P1 to make a response
function waitForP1() {
  return new Promise(function (resolve, reject) {
    (function waitForChoice() {
      if (p1MoveMade) {
        p1MoveMade = false; //reset for next turn
        return resolve("P1 move choice, or P1 data or something");
      }
      setTimeout(waitForChoice, 30);
    })();
  });
}



//B+
function waitForGameOver() {
  try {
    return new Promise(function (resolve, reject) {
      (async function waitForGame() {
        msg.textContent = "Waiting For Player Move"
        await waitForP1();
        disableButtons()
        // update computer health with damage
        if (computer.getHealth() <= 0) return resolve("PLAYER WINS");
        await delay(1500)
        computerAttack();
        if (p1.getHealth() <= 0) return resolve("COMPUTER WINS");
        await delay(1500)
        enableButtons()
        setTimeout(waitForGame, 30);
      })();
    });
  } catch (e) {
    console.log(e)
  }
}

function delay(time) {
  return new Promise((resolve, reject) => {
    if (isNaN(time)) {
      reject(new Error('delay requires a valid number.'))
    }
    setTimeout(resolve, time);
  }).catch(e => console.error(e))
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