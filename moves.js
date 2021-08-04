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


pokemonForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  try {
    input.value = input.value.toLowerCase()
    const url = `${pokemonBase}/${input.value}`
    pokemonData = await fetchUrl(url);
    confirmPokemon(pokemonData.sprites.front_default);
  }catch(e){
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
finalSubmitButton.addEventListener('click', async function (e){
  //store pokemon info in object?
  //generate random pokemon for computer and store in object
  const user = createPokemonObject(pokemonData, p1);
  const user.moves = await fetchMoves()

  //1118 pokemon
  const pokeNum = Math.floor(Math.random() * 1118) + 1;
  console.log(pokeNum)
  const compURL = `${pokemonBase}/${pokeNum}`;
  computerData = await fetchUrl(compURL);
  let u = createPokemonObject(computerData, computer);
  u.moves = generateMoves()
  window.location.href = "/battle.html";
})

//creates pokemon object given pokemon json data and the user(player1 or the computer)
function createPokemonObject(pokemon, user) {
  user.name = pokemon.forms[0].name;
  user.sprite = pokemon.sprites.back_default;
  user.health = pokemon.stats[0].base_stat * 10;
  console.log("HERE 1")
  return user
}

//generate moves given json data for pokemon
async function generateMoves(pokemon) {
  //returns 4 random moves from moveset
  var moves = []
  console.log('HERE')
  try{
  const numMoves = pokemon.moves.length;
  console.log(pokemon.moves)
  for(let i = 0; i < 4; i++) {
    //
    const pokeNum = Math.floor(Math.random() * numMoves);
    const moveData = await fetchUrl(pokemon.moves[pokeNum].move.url)
    const moveInfo = createMoveObject(moveData);
    moves.push(moveInfo);
  }
  return moves;
  }catch(e){
    console.log("Unable To Fetch Moves", e)
  }
}

function createMoveObject(moveData) {
  const moveInfo = {}
  moveInfo.name = moveData.name;
  moveInfo.damage = moveData.power;
  return moveInfo;
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

function isError(data){
  if(!data){
    console.error('missing data')
    return true
  }
  return false
}

async function fetchUrl(url, requestOptions = null){
  let res;
  if(!requestOptions && url){
    const res = await fetch(url)
    const data = await res.json();
    return data;
     
  }else{
  res = await fetch(url,requestOptions)
  }
return res.json()
}
