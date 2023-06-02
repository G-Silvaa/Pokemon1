// const { default: axios } = require("axios");

const CardPokemon = document.querySelectorAll('.js-open-details-podemon');
const closePokemon = document.querySelector('.close')


function openDetailsPokemon(){
    document.documentElement.classList.add('open-modal')
    console.log('aa')
}

function closeDetailsPokemon(){
    document.documentElement.classList.remove('open-modal')
}

CardPokemon.forEach(card => {
    card.addEventListener('click', openDetailsPokemon)})

closePokemon.addEventListener('click', closeDetailsPokemon)




// parte do consumo de api do pokemon


function listingPokemons(urlApi) {
    axios({
        method: 'GET',
        url: urlApi
    })

    .then((responde) => {
        const numberPokemon = document.getElementById('js-number-pokemons')

        const {results, next, count} = responde.data;

        console.log(count)

        numberPokemon.innerText = count;

        results.forEach(pokemon => {
            let urlApiDetails = pokemon.url;

            axios({
                method: 'GET',
                url: `${urlApiDetails}`
            })
            .then(responde => {
                const {name , id, sprites, types} = responde.data;
                console.log(name)

                const infocard = {
                    name: name,
                    code: id,
                    Image: sprites.other.dream_world.front_default,
                    types: types[0].type.name
                }
                console.log(infocard)
            })
        })
    })
}

listingPokemons('https://pokeapi.co/api/v2/pokemon?limit=9&offset=0');



