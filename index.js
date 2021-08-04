const pokemonForm = document.querySelector('#choosePokemon');
const confirm = document.querySelector('.confirm')
const submit = document.querySelector('#submit')
const finalSubmit = document.querySelectorAll('.finalsubmit')
const title = document.querySelector('h3')
const finalcancel = document.querySelector('#finalcancel')
const finalsubmit = document.querySelector('#finalsubmit')
const pokemonBase = "https://pokeapi.co/api/v2/pokemon";
const input = pokemonForm.elements.pokeName;

pokemonForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  try {
    const pokemonName = input.value.toLowerCase()
    const url = `${pokemonBase}/${pokemonName}`
    const pokemon = await fetchUrl(url);
    confirmPokemon(pokemon.sprites.front_default);
  }catch(e){
    input.value = ''
    title.textContent = "Invalid Pokemon"
  }
});

finalcancel.addEventListener('click', (e) => {
  submit.style.display = 'inline-block';
  input.style.display = 'inline-block';
  const deletePoke = document.querySelector('.menuPoke')
  deletePoke.remove()
  finalSubmit.forEach((button) => button.style.display = 'none')
  input.value = '';
  title.textContent = "Choose Your Pokemon"
})

finalsubmit.addEventListener('click', (e) => {
  //go to pokemon battle
  //store pokemon info in object?
  //generate random pokemon for computer and store in object
})




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
