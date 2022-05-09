


const typeIcons = {
    bug: "imgs/pokemon-type-icons/bug.svg",
    dark: "imgs/pokemon-type-icons/dark.svg",
    dragon: "imgs/pokemon-type-icons/dragon.svg",
    electric: "imgs/pokemon-type-icons/electric.svg",
    fairy: "imgs/pokemon-type-icons/fairy.svg",
    fighting: "imgs/pokemon-type-icons/fighting.svg",
    fire: "imgs/pokemon-type-icons/fire.svg",
    flying: "imgs/pokemon-type-icons/flying.svg",
    ghost: "imgs/pokemon-type-icons/ghost.svg",
    grass: "imgs/pokemon-type-icons/grass.svg",
    ground: "imgs/pokemon-type-icons/ground.svg",
    ice: "imgs/pokemon-type-icons/ice.svg",
    normal: "imgs/pokemon-type-icons/normal.svg",
    poison: "imgs/pokemon-type-icons/poison.svg",
    psychic: "imgs/pokemon-type-icons/psychic.svg",
    rock: "imgs/pokemon-type-icons/rock.svg",
    steel: "imgs/pokemon-type-icons/steel.svg",
    water: "imgs/pokemon-type-icons/water.svg",
};
const mainTypeIcons = Object.keys(typeIcons);

const typeColors = {
    bug: "#92BD2D",
    dark: "#595761",
    dragon: "#0C6AC8",
    electric: "#F2D94E",
    fairy: "#EF90E6",
    fighting: "#D3425F",
    fire: "#FBA64C",
    flying: "#A1BBEC",
    ghost: "#5F6DBC",
    grass: "#60BD58",
    ground: "#DA7C4D",
    ice: "#76D1C1",
    normal: "#A0A29F",
    poison: "#B763CF",
    psychic: "#FA8582",
    rock: "#C9BC8A",
    steel: "#5795A3",
    water: "#539DDF",
};
const mainTypeColors = Object.keys(typeColors);



/* STORE POKEMON'S QUANTITY & GENERATION'S NUMBER */

function GetPokemon (offset, limit, generation) {
    localStorage.setItem("offsetPokemon", offset);
    localStorage.setItem("limitPokemon", limit);
    localStorage.setItem("pokemonGeneration", generation);
}

/* ACCESS POKEMON'S QUANTITY */

const start = parseInt(localStorage.getItem("offsetPokemon"));
const end = parseInt(localStorage.getItem("limitPokemon"));



/* GENERATION TITLE */

function SetGenerationTitle() {
    document.getElementById("gen-title").textContent = "Generation " + localStorage.getItem("pokemonGeneration");
}

SetGenerationTitle();



const promises = [];
const pokemonResults = [];

const FetchPokemon = () => {

    for (let i = start; i <= end; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }

    Promise.all(promises).then(results => {
        results.reduce((accumulator, pokemon) => {
            pokemonResults.push(pokemon)
        }, '')
        GetPokemonData(results)
    })

}

FetchPokemon();


function GetPokemonData(data) {
    const pokemons = data.reduce((accumulator, pokemon) => {

        accumulator += DisplayPokemon(pokemon)
        
        return accumulator;
    }, '');

    PokemonHTML(pokemons)
}


function PokemonHTML(pokemons) {
    const ul = document.querySelector('[data-js="pokedex"]');
    ul.innerHTML = pokemons;
}



/* POKEMON SEARCH FILTER */

const pokemonSearchBar = document.getElementById("search");

pokemonSearchBar.addEventListener('keyup', (e) => {
        const searchString = e.target.value.toLowerCase();

        const filteredPokemons = pokemonResults.filter((pokemon) => {
            return pokemon.name.toLowerCase().startsWith(searchString)
        });

        GetPokemonData(filteredPokemons)
});



/* VISUALIZATION LOGIC OF POKEMON TYPES & TYPES' COLOR */

var secondType = ``;
var typesVar, secondTypesVar;
var typeColorVar, secondTypeColorVar;

function SetTypeVisualization(pokemons) {
    const typesArray = [pokemons.types.map(typeinfo => typeinfo.type.name)];
    return typesArray.map(arrays => {
        if (arrays.length >= 2) {
            secondType = `
                <div class="type-icon" style="background-color: ${secondTypeColorVar};">
                    <img class="type-image" src="${secondTypesVar}">
                </div>
            `;
        }else {
            secondType = ``;
        } 
    });
}

function GetIconTypes(pokemons) {
    const types = pokemons.types.map(typeinfo => typeinfo.type.name);

    const typeFind = mainTypeIcons.find(type => types.indexOf(type) == 0)
    typesVar = typeIcons[typeFind];

    const secondTypeFind = mainTypeIcons.find(type => types.indexOf(type) == 1)
    secondTypesVar = typeIcons[secondTypeFind];

    SetTypeVisualization(pokemons);
}

function GetColorTypes(pokemons) {
    const types = pokemons.types.map(typeinfo => typeinfo.type.name);

    const colorFind = mainTypeColors.find(type => types.indexOf(type) == 0)
    typeColorVar = typeColors[colorFind];

    const secondColorFind = mainTypeColors.find(type => types.indexOf(type) == 1)
    secondTypeColorVar = typeColors[secondColorFind];

    SetTypeVisualization(pokemons);
}



/* DISPLAY */

const DisplayPokemon = (pokemon) => {

    GetIconTypes(pokemon);
    GetColorTypes(pokemon);

    return (`
    <hr class="pokemon-card-divider">
        <li class="pokemon-card" id="iui">
            <img class="card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png">
            <div class="card-content">
                <p class="card-id">0${pokemon.id}</p>
                <h2 class="card-name">${pokemon.name}</h2>

                <div class="card-type">
                    <div class="type-icon" style="background-color: ${typeColorVar};">
                        <img class="type-image" src="${typesVar}">
                    </div>
                    &nbsp;
                    ${secondType}
                </div>
            </div>
        </li>
    `)
};

