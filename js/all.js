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

console.log(CardPokemon)

// parte do consumo de api do pokemon

axios({
    method: 'GET',
    url: 'https://pokeapi.co/api/v2/pokemon'
})

.then(json => console.log(json))