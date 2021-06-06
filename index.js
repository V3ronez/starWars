const personagensContador = document.getElementById("personagens");
const luasContador = document.getElementById("luas");
const planetasContador = document.getElementById("planetas");
const navesContador = document.getElementById("naves");

preencherContadores();
preencherTabela();

function preencherContadores() {
    // personagensContador.innerHTML = swapiGet("people/")
    Promise.all([
        swapiGet("people/"),
        swapiGet("vehicles/"),
        swapiGet("planets/"),
        swapiGet("starships/")
    ]).then(function (results) {
        // const acct = results[0];
        // const perm = results[1];
        // console.log("==>", results);
        personagensContador.innerHTML = results[0].data.count;
        luasContador.innerHTML = results[1].data.count;
        planetasContador.innerHTML = results[2].data.count;
        navesContador.innerHTML = results[3].data.count;
    });
}

async function preencherTabela() {
    const response = await swapiGet("films/");
    // console.log(response);
    const tableData = response.data.results;
    tableData.forEach((film) => {
        $("#filmsTable").append(`<tr>
    <td>${film.title}</td>
    <td>${moment(film.release_date).format("DD/MM/YYYY")}</td>
    <td>${film.director}</td>
    <td>${film.episode_id}</td>
    </tr>`);
    });
}

function swapiGet(param) {
    return axios.get(`https://swapi.dev/api/${param}`);
}