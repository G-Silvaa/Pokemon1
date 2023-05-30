const CardPokemon = document.querySelectorAll('.js-open-details-podemon');
const closePokemon = document.querySelector('.close')


function openDetailsPokemon(){
    document.documentElement.classList.add('open-modal')
}

function closeDetailsPokemon(){
    document.documentElement.classList.remove('open-modal')
}

CardPokemon.forEach(card => {
    card.addEventListener('click', openDetailsPokemon)})

closePokemon.addEventListener('click', closeDetailsPokemon)