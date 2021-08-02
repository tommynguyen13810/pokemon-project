const pokemonForm = document.querySelector('#choosePokemon');


pokemonForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const pokemonName = pokemonForm.elements.pokeName
    const pokemon = document.createElement('h2')
    pokemon.textContent = pokemonName.value
    document.body.append(pokemon)
});