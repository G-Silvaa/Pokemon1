// const { default: axios } = require("axios");

const CardPokemon = document.querySelectorAll(".js-open-details-podemon");
const closePokemon = document.querySelector(".close");


function openDetailsPokemon() {
  document.documentElement.classList.add("open-modal");
  
  
  let codePokemon = this.getAttribute('code-pokemon')
  let  imagepokemon = this.querySelector('.api-tamanho')
  let iconTypesPokemon = this.querySelector('.icon3 img')
  let namePokemon = this.querySelector('.NamePokemonn')
  let codestringPokemon = this.querySelector('.info span')
  textnamePokemon = namePokemon.innerHTML;
  textCodePokemon = codestringPokemon.innerHTML;


  

  

  const modalDetails = document.getElementById('js-modal-details')
  const imgPokemonModal = document.getElementById('js-image-pokemon-modal')
  const iconTypePokemonModal = document.getElementById('js-image-type-modal')
  const namePokemonModal = document.getElementById('js-name-pokemon-modal')
  const codePokemonModal = document.getElementById('s-code-pokemon-modal')

  

    imgPokemonModal.setAttribute('src', imagepokemon.getAttribute('src'))
    modalDetails.setAttribute('typePokemonModal', this.classList[3])
    iconTypePokemonModal.setAttribute('src',iconTypesPokemon.getAttribute('src'))
   
    namePokemonModal.textContent = textnamePokemon;
    codePokemonModal.textContent = textCodePokemon;

    

    

//   axios({
//     method: 'GET',
//     url: `https://pokeapi.co/api/v2/pokemon/${codePokemon}`
//   })

}

function closeDetailsPokemon() {
  document.documentElement.classList.remove("open-modal");
}

CardPokemon.forEach((card) => {
  card.addEventListener("click", openDetailsPokemon);
});

closePokemon.addEventListener("click", closeDetailsPokemon);

// parte do card pokemon
const areaPokemon = document.getElementById("js-list-pokemon");

function primeiraLetraMa(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function createPoke(code, type, nome, imagePo) {
  let card = document.createElement("button");
  card.classList = `js-open-details-podemon tamanho card-pokemon ${type} `;
  card.setAttribute('code-pokemon', code)
  areaPokemon.appendChild(card);

  let image = document.createElement("div");
  image.classList = `image ${type}`;
  card.appendChild(image);

  let imageSrc = document.createElement("img");
  imageSrc.classList = "api-tamanho";
  imageSrc.setAttribute("src", imagePo);
  image.appendChild(imageSrc);

  let infocard = document.createElement("div");
  infocard.classList = "info";
  card.appendChild(infocard);

  let textcard = document.createElement("div");
  textcard.classList = "text";
  infocard.appendChild(textcard);

  let spancard = document.createElement("span");
  spancard.textContent =
    code < 10 ? `#00${code}` : code < 100 ? `#0${code}` : `#${code}`;
  textcard.appendChild(spancard);

  let namecard = document.createElement("h3");
  namecard.classList = "NamePokemonn"
  namecard.textContent = primeiraLetraMa(nome);
  textcard.appendChild(namecard);

  let areaicon = document.createElement("div");
  areaicon.classList = "icon3";
  infocard.appendChild(areaicon);

  let imgType = document.createElement("img");
  imgType.setAttribute("src", `./assets/icon-types/${type}.svg`);
  areaicon.appendChild(imgType);
}

// parte do consumo de api do pokemon

function listingPokemons(urlApi) {
  axios({
    method: "GET",
    url: urlApi,
  }).then((responde) => {
    const numberPokemon = document.getElementById("js-number-pokemons");

    const { results, next, count } = responde.data;

    numberPokemon.innerText = count;

    results.forEach((pokemon) => {
      let urlApiDetails = pokemon.url;

      axios({
        method: "GET",
        url: `${urlApiDetails}`,
      }).then((responde) => {
        const { name, id, sprites, types } = responde.data;

        const infocard = {
          nome: name,
          code: id,
          image: sprites.other.dream_world.front_default,
          type: types[0].type.name,
        };

        createPoke(infocard.code, infocard.type, infocard.nome, infocard.image);

        const cardpokemon = document.querySelectorAll(
          ".js-open-details-podemon"
        );

        cardpokemon.forEach((card) => {
          card.addEventListener("click", openDetailsPokemon);
        });
      });
    });
  });
}

listingPokemons(`https://pokeapi.co/api/v2/pokemon?limit=9&offset=0`);


CardPokemon.forEach((card) => {
  card.addEventListener("click", openDetailsPokemon);
});

closePokemon.addEventListener("click", closeDetailsPokemon);

//parte para listar os tipos

const areaTypes = document.getElementById("js-type-area");

axios({
  method: "GET",
  url: "https://pokeapi.co/api/v2/type",
}).then((response) => {
  const { results } = response.data;

  results.forEach((type, index) => {
    if (index < 18) {
      let itemtype = document.createElement("li");
      areaTypes.appendChild(itemtype);

      let buttonFilter = document.createElement("button");
      buttonFilter.classList = `type-filter ${type.name} bordere color`;
      buttonFilter.setAttribute("code-type", index + 1);
      itemtype.appendChild(buttonFilter);

      let imageIC = document.createElement("div");
      imageIC.classList = "icon2";
      buttonFilter.appendChild(imageIC);

      let imgtypee = document.createElement("img");
      imgtypee.setAttribute("src", `./assets/icon-types/${type.name}.svg`);
      imageIC.appendChild(imgtypee);

      let srcType = document.createElement("span");
      srcType.textContent = primeiraLetraMa(type.name);
      buttonFilter.appendChild(srcType);

      const alltypes = document.querySelectorAll(".type-filter");

      alltypes.forEach((btn) => {
        btn.addEventListener("click", filterByTypes);
      });
    }
  });
});
// script que faz funcionar o load more

const btnLoadMore = document.getElementById("js-btn-load-more");

let CountPokemons = 10;

function showMorePokemon() {
  listingPokemons(
    `https://pokeapi.co/api/v2/pokemon?limit=9&offset=${CountPokemons}`
  );

  CountPokemons = CountPokemons + 9;
}

btnLoadMore.addEventListener("click", showMorePokemon);

// funcao para filtrar os pokemons

function filterByTypes() {
  let idPokemon = this.getAttribute("code-type");
  const areaPokemon = document.getElementById("js-list-pokemon");
  const btnLoadMore = document.getElementById("js-btn-load-more");
  const CountPokemons = document.getElementById("js-number-pokemons");
  const alltypes = document.querySelectorAll(".type-filter");

  areaPokemon.innerHTML = "";
  btnLoadMore.style.display = "none";

  const sectionPokemns = document.querySelector(".container3");
  const topSection = sectionPokemns.offsetTop;
  window.scrollTo({
    top: topSection,
    behavior: "smooth",
  });

  alltypes.forEach((type) => {
    type.classList.remove("active");
  });

  this.classList.add("active");

  if (idPokemon) {
    axios({
      method: "GET",
      url: `https://pokeapi.co/api/v2/type/${idPokemon}`,
    }).then((response) => {
      const { pokemon } = response.data;
      CountPokemons.textContent = pokemon.length;

      pokemon.forEach((pok) => {
        const { url } = pok.pokemon;

        axios({
          method: "GET",
          url: `${url}`,
        }).then((response) => {
          const { name, id, sprites, types } = response.data;

          const infocard = {
            nome: name,
            code: id,
            image: sprites.other.dream_world.front_default,
            type: types[0].type.name,
          };
          if (infocard.image) {
            createPoke(
              infocard.code,
              infocard.type,
              infocard.nome,
              infocard.image
            );
          }

          const cardpokemon = document.querySelectorAll(
            ".js-open-details-podemon"
          );

          cardpokemon.forEach((card) => {
            card.addEventListener("click", openDetailsPokemon);
          });
        });
      });
    });
  } else {
    areaPokemon.innerHTML = "";
    listingPokemons(`https://pokeapi.co/api/v2/pokemon?limit=9&offset=0`);
    btnLoadMore.style.display = "block";
  }
}

// funcao para filtrar os pokemons pelo nome

const btnSearch = document.getElementById("js-btn-search");
const inputSearch = document.getElementById("js-input-search");

btnSearch.addEventListener("click", searchPokemon);

inputSearch.addEventListener("keyup", (event) => {
  if (event.code == "Enter") {
    searchPokemon();
  }
});

function searchPokemon() {
  let valueInput = inputSearch.value.toLowerCase();
  

  axios({
    method: "GET",
    url: `https://pokeapi.co/api/v2/pokemon/${valueInput}`,
  }).then((response) => {
    const CountPokemons = document.getElementById("js-number-pokemons");
    areaPokemon.innerHTML = "";
    btnLoadMore.style.display = "none";
    CountPokemons.textContent = 1;

    const { name, id, sprites, types } = response.data;

    const infocard = {
      nome: name,
      code: id,
      image: sprites.other.dream_world.front_default,
      type: types[0].type.name,
    };

    createPoke(infocard.code, infocard.type, infocard.nome, infocard.image);

    const cardpokemon = document.querySelectorAll(".js-open-details-podemon");

    cardpokemon.forEach((card) => {
      card.addEventListener("click", openDetailsPokemon);
    });
  })

  .catch((error) => {
    const CountPokemons = document.getElementById("js-number-pokemons");
    areaPokemon.innerHTML = "";
    btnLoadMore.style.display = "none";
    CountPokemons.textContent = 0;
    alert('Pokemon inexistente')
  })
}


