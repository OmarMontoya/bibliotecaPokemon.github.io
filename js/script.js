let pokemonData = document.getElementById('pokemonCard');
const boton = document.getElementById('botonPokebola');
let pokemon = {};
let i = 1;
const tiposDePokemon = ['grass', 'fire', 'water', 'normal', 'dragon', 'rock', 'poison', 'ground', 'fighting', 'electric', 'flying', 'fairy', 'dark', 'ice', 'steel', 'psychic', 'bug', 'ghost']
let resultado = '';

let fetchDatos = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (response.status !== 200) {
        throw new Error("No se pudo ejecutar la solicitud de Fetch API");
    }
    let data = await response.json();
    pokemon = {
        nombre: data.species.name,
        hp: data.stats[0].base_stat,
        ataque: data.stats[1].base_stat,
        defensa: data.stats[2].base_stat,
        atq_especial: data.stats[3].base_stat,
        def_especial: data.stats[4].base_stat,
        velocidad: data.stats[5].base_stat,
        tipo: data.types
    };
    return data;
};

const numAleatorio = () => {
    let numero = Math.floor((Math.random() * 905) + 1);
    i = numero;
    fetchDatos(i)
        .then((data) => {
            console.log("resuelta", data);
            resultado = `
                            <div class="d-flex justify-content-center">
                            <div class="flip-card">
                                <div class="flip-card-inner">
                                    <div class="flip-card-front">
                                        <div id="mainCard" class="card bg-danger border-dark p-2 rounded" style="width: 18rem;">
                                            <img id="imagen" class="card-img-top bg-light border border-dark" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i}.png" alt="Card image cap">
                                            <div class="card-body bg-light rounded border border-dark">
                                                <div class="d-flex justify-content-center">
                                                    <h5 id='nombre' class="card-title">${pokemon.nombre[0].toUpperCase()+pokemon.nombre.substring(1)}</h5>
                                                </div>
                                                <div id="atributos" class="border rounded">
                                                    <div class="row">
                                                        <div class="col-4">PS: ${pokemon.hp}</div>
                                                        <div class="col-4">ATQ: ${pokemon.ataque}</div>
                                                        <div class="col-4">DEF: ${pokemon.defensa}</div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-4">AES: ${pokemon.atq_especial}</div>
                                                        <div class="col-4">DES: ${pokemon.def_especial}</div>
                                                        <div class="col-4">VEL: ${pokemon.velocidad}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flip-card-back d-flex flex-column align-items-center">
                                        <br><div class="idPokemon">
                                            # ${i}
                                        </div>
                                        <img class="imgPokemon" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${i}.png" alt=""><br>
                                        <img src="recursos/tipo_pokemon.png">
                                        <div id="tipo" class="tipo">
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                `
            pokemonData.innerHTML = resultado;
            pokemonTipo(pokemon.tipo, tiposDePokemon);
        })
        .catch((err) => {
            console.log("rechazada", err.message);
        });

}

const pokemonTipo = function (tipo, tipos) {
    let imagenTipo = document.getElementById('tipo');
    for (let i = 0; i < tipo.length; i++) {
        for (let j = 0; j < tipos.length; j++) {
            if (tipos[j] === tipo[i].type.name) {
                imagenTipo.innerHTML += `
                                        <img class="imagenTipo p-3" src="recursos/${tipos[j]}.png">
                `
            }
        }
    }
}


boton.addEventListener('click', numAleatorio);