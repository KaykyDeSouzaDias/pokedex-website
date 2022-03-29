


function OpenSideNav() {
    /*document.getElementById("my-side-nav").style.width = "100%";*/
}
function CloseSideNav() {
    document.getElementById("my-side-nav").style.width = "0";
}


const fetchPokemon = () => {
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

    const pokemonPromises = [];

    for (let i = 1; i <= 150; i++) {
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()));
    }

    Promise.all(pokemonPromises)
        .then(pokemons => {
            console.log(pokemons)

            const pokemonList = pokemons.reduce((accumulator, pokemon) => {
                const types = pokemon.types.map(typeInfo => typeInfo.type.name);

                accumulator += `
                    <li>${pokemon.name}</li>
                `;
                return accumulator;
            }, '');

            //console.log(pokemonList)
        });
}

fetchPokemon();

