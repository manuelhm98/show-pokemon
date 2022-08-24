import pokemonApi from '@/api/pokemonApi'

/**
 * It creates an array of 650 elements, then maps each element to its index + 1.
 * @returns An array of numbers from 1 to 650
 */
const getPokemon = () => {
  const pokemonsArr = Array.from(Array(650))
  return pokemonsArr.map((_, index) => index + 1)
}

/**
 * It gets a random pokemon, then gets the names of the first four pokemon in the array, then returns
 * the names of the pokemon.
 * @returns An array of objects with the pokemon name and id.
 */
const getPokemonsOptions = async () => {
  const mixedPokemon = getPokemon().sort(() => Math.random() - 0.5)
  const pokemons = await getPOkemonName(mixedPokemon.splice(0, 4))
  return pokemons
}

/**
 * It takes an array of pokemon ids, and returns an array of objects containing the pokemon's name and
 * id.
 * @param [] - [a, b, c, d] = []
 * @returns An array of objects with the name and id of the pokemon.
 */
const getPOkemonName = async ([a, b, c, d] = []) => {
  const promiseArr = [
    pokemonApi.get(`/${a}`),
    pokemonApi.get(`/${b}`),
    pokemonApi.get(`/${c}`),
    pokemonApi.get(`/${d}`),
  ]
  const [p1, p2, p3, p4] = await Promise.all(promiseArr)
  return [
    { name: p1.data.name, id: p1.data.id },
    { name: p2.data.name, id: p2.data.id },
    { name: p3.data.name, id: p3.data.id },
    { name: p4.data.name, id: p4.data.id },
  ]
}

export default getPokemonsOptions
