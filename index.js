const express = require("express");
const app = express();
const logger = require("./loggerMiddleware");
var pokemons = require("./pokemons");
const cors = require("cors");
app.use(express.json());
app.use(logger);
app.use(cors());

app.get("/api/pokemons", (request, response) => {
  response.json(pokemons);
});
app.get("/api/pokemons/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);

  if (pokemon) {
    response.json(pokemon);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/pokemons/:id", (request, response) => {
  const id = Number(request.params.id);
  pokemons = pokemons.filter((pokemon) => pokemon.id !== id);
  response.status(204).end();
  response.send(`${pokemon.name} deleted successfully`);
});

app.put("/api/pokemons/:id", (request, response) => {
  const data = request.body;
  const id = parseInt(request.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  if (!pokemon || !pokemon.name) {
    return response.status(400).json({
      error: "pokemon not found",
    });
    const pokemon = {
      id: pokemon.id,
      name: data.name,
      sprite: data.sprite,
      catched: typeof data.catched !== "undefined" ? data.catched : false,
    };

    response.status(200).json(Pokemon);
  }
});

app.post("/api/pokemons", (request, response) => {
  const pokemon = request.body;
  if (!pokemon || !pokemon.name) {
    return response.status(400).json({
      error: "pokemon not found",
    });
  }

  const ids = pokemons.map((pokemon) => pokemon.id);
  const maxId = Math.max(...ids);
  const newPokemon = {
    id: maxId + 1,
    name: pokemon.name,
    sprite: pokemon.sprite,
    catched: typeof pokemon.catched !== "undefined" ? pokemon.catched : false,
  };

  pokemons = [...pokemons, newPokemon];
  response.status(201).json(newPokemon);
});

app.use((request, response) => {
  response.status(404).json({ error: "Not Found" });
});
const PORT = process.env.PORT ||3000;


app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
