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




// parte do card pokemon
const areaPokemon = document.getElementById('js-list-pokemon')

function primeiraLetraMa(string){
 return string.charArt(0).toUpperCase() + string.slice(1);
}

function createPoke(code, type, nome, imagePo){
    let card = document.createElement('button');
    card.classList = `js-open-details-podemon tamanho card-pokemon `;
    areaPokemon.appendChild(card);

   let image = document.createElement('div');
   image.classList = `image ${type}`;
   card.appendChild(image);

   let imageSrc = document.createElement('img');
   imageSrc.classList = 'api-tamanho'
   imageSrc.setAttribute('src',imagePo);
   image.appendChild(imageSrc)
   
    let infocard = document.createElement('div');
    infocard.classList ='info';
    card.appendChild(infocard)

    let textcard = document.createElement('div');
    textcard.classList = 'text'
    infocard.appendChild(textcard)

    let spancard = document.createElement('span')
    spancard.textContent = (code < 10) ? `#00${code}`: (code < 100) ? `#0${code}` : `#${code}` ;
    textcard.appendChild(spancard);

    let  namecard = document.createElement('h3')
    namecard.textContent = nome;
    textcard.appendChild(namecard)

    let areaicon = document.createElement('div')
    areaicon.classList = 'icon3';
    infocard.appendChild(areaicon)

    let imgType = document.createElement('img');
    imgType.setAttribute('src',`./assets/icon-types/${type}.svg`)
    areaicon.appendChild(imgType)
   
    
}

// parte do consumo de api do pokemon

function listingPokemons(urlApi) {
    axios({
        method: 'GET',
        url: urlApi
    })

    .then((responde) => {
        const numberPokemon = document.getElementById('js-number-pokemons')

        const {results, next, count} = responde.data;

        numberPokemon.innerText = count;

        

        results.forEach(pokemon => {
            let urlApiDetails = pokemon.url;


            axios({
                method: 'GET',
                url: `${urlApiDetails}`
            })
            .then(responde => {
                const {name , id, sprites, types} = responde.data;
                
               

                const infocard = {
                    nome: name,
                    code: id,
                    image: sprites.other.dream_world.front_default,
                    type: types[0].type.name,
                    
                   
                }
                
                createPoke(infocard.code, infocard.type, infocard.nome, infocard.image);
                
                    
                const cardpokemon = document.querySelectorAll('.js-open-details-podemon');

                cardpokemon.forEach(card => {
                    card.addEventListener('click', openDetailsPokemon);

                    
                })
               
            })
        })
    })
}

listingPokemons('https://pokeapi.co/api/v2/pokemon?limit=9&offset=0');

CardPokemon.forEach(card => {
    card.addEventListener('click', openDetailsPokemon)})

closePokemon.addEventListener('click', closeDetailsPokemon)



