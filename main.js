


function OpenSideNav() {
    document.getElementById("my-side-nav").style.width = "100%";
}
function CloseSideNav() {
    document.getElementById("my-side-nav").style.width = "0";
}


/*const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;


const createPokemonPromises = () => Array(150).fill().map((_, index) => fetch(getPokemonUrl(index + 1)).then(response => response.json()));

    
const createPokemonsHTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {
    const pokemonTypes = types.map(typeInfo => typeInfo.type.name);

    accumulator += `
        <li class="pokemon-card ${pokemonTypes[0]}">
            <img class="pokemon-card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png">
            <img class="pokemon-card-background" src="/imgs/backgrounds/pokeball_bg.png" alt="">
            <h2 class="pokemon-card-title">${name}</h2>
            <p class="pokemon-card-subtitle">${pokemonTypes.join(' | ')}</p>
        </li>
    `;
    return accumulator;
}, '');


const insertPokemonsHTML = pokemons => {

    const ul = document.querySelector('[data-js="pokedex"]');
    ul.innerHTML = pokemons;

}


const pokemonPromises = createPokemonPromises();
Promise.all(pokemonPromises).then(createPokemonsHTML).then(insertPokemonsHTML)*/

