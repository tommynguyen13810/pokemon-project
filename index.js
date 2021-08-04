const pokemonForm = document.querySelector('#choosePokemon');
const pokemonBase = "https://pokeapi.co/api/v2/pokemon";
const confirm = document.querySelector('.confirm')
const title = document.querySelector('h3')
const submit = document.querySelector('#submit')
const input = pokemonForm.elements.pokeName;
const finalSubmit = document.querySelectorAll('.finalsubmit')

pokemonForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  try {
    const pokemonName = input.value.toLowerCase()
    const url = `${pokemonBase}/${pokemonName}`
    const pokemon = await fetchUrl(url);
    confirmPokemon(pokemon.sprites.front_default);
  }catch(e){
    title.textContent = "Invalid Pokemon"
  }
});

function confirmPokemon(sprite) {
  const img = document.createElement('img')
  img.src = sprite;
  confirm.append(img)
  submit.style.display = 'none';
  input.style.display = 'none';
  title.textContent = "Choose This Pokemon?";
  finalSubmit[0].style.display = 'block';
  finalSubmit[1].style.display = 'block';
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
