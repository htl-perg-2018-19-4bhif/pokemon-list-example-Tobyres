/** Kurze Anmerkung:
 *    Ohne Browsersync habe ich immer einen CORS Fehler bekommen, welchen ich noch nicht ganz durchschaut habe
 *    Werde Sie aber eh gleich morgen im Unterricht fragen, um was es sich dabei jetzt genau handelt*/
const pokeList = document.getElementById('pokeList');
const pokeDetails = document.getElementById('pokeDetails');
if (pokeDetails) {
    let url = window.location.href;
    let id;
    if (url.match('\\?id=\\d+$')) {
        id = url.slice(45);
    }
    (function () {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(response => {
            response.json().then(pokemon => {
                let html = `<p class="text-capitalize text-success">${pokemon.name}</p>`;
                html += `<p><img src="${pokemon.sprites.front_default}"/></p>`;
                html += `<p>Weight: ${pokemon.weight / 10} kg</p>`;
                html += `<p>Abilites: </p>`;
                html += `${displayAbilities(pokemon)}`;
                pokeDetails.innerHTML = html;
            });
        });
    })();
}
else if (pokeList) {
    (function () {
        fetch('https://pokeapi.co/api/v2/pokemon/').then(response => {
            response.json().then(pokelist => {
                let html = '';
                for (const pokemon of pokelist.results) {
                    let id = pokemon.url.slice(34, length - 1);
                    html += `<li class="marginOfListElements text-capitalize">`;
                    html += `${pokemon.name}`;
                    html += `<input type="button" value="Details" class="btn-info detailsButtons" onclick="openDetails(${id})"></li>`;
                }
                pokeList.innerHTML = html;
            });
        });
    })();
}
function displayAbilities(pokeDet) {
    let html = `<ul class="text-capitalize">`;
    for (const abilityObj of pokeDet.abilities) {
        html += `<li>${abilityObj.ability.name}</li>`;
    }
    return html + `</ul>`;
}
function backToList() {
    window.open("./pokemonList.html", "_self");
}
/** I opened that in the same window because to me, it made no sense to open a tab and then go back with the back button to the original site*/
function openDetails(id) {
    window.open("./pokemonDetails.html?id=" + id, "_self");
}
