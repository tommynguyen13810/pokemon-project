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

const p1 = {}
const computer = {}


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
finalSubmitButton.addEventListener('click', async function (e) {
  //store pokemon info in object?
  //generate random pokemon for computer and store in object
  createPokemonObject(pokemonData, p1);
  p1.moves = await parseMoves(pokemonData)
  console.log(p1)
  const pokeNum = getRandomInt(898);
  console.log(pokeNum)
  const compURL = `${pokemonBase}/${pokeNum}`;
  computerData = await fetchUrl(compURL);
  createPokemonObject(computerData, computer);
  computer.moves = await parseMoves(computerData)
  console.log(computer)
  window.location.href = "/battle.html";
})

//creates pokemon object given pokemon json data and the user(player1 or the computer)
async function createPokemonObject(pokemon, user) {
  user.name = pokemon.forms[0].name;
  user.sprite = pokemon.sprites.back_default;
  user.health = pokemon.stats[0].base_stat * 10;
  console.log("HERE 1")
}


//getDamages and returns move 
async function createMoveObject(moveurl) {
  try {
    const moveData = await fetchUrl(moveurl)
    const moveInfo = {
      name: moveData.name,
      damage: moveData.power
    }
    return moveInfo;
  } catch (e) {
    console.log("Could not fetch moves", e)
  }

}

//generate moves given json data for pokemon
async function parseMoves({ moves }) {
  try {
  //returns 4 random moves from moveset
  //Generates moves return 4 moves 
  //4 move urls. 
  let finalMoves = [];
  for (let i = 0; i <= 3; i++) {
    let rand = getRandomInt(moves.length);
    let chosenMove = await createMoveObject(moves[rand].move.url)
    finalMoves.push(chosenMove)
  }
  return finalMoves;
  }catch(e) {
    console.log("Couldn't create moves", e)
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

function isError(data) {
  if (!data) {
    console.error('missing data')
    return true
  }
  return false
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
