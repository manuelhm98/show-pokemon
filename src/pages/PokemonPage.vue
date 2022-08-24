<template>
  <h1 v-if="!pokemon"></h1>
  <div v-else>
    <h1>Who is this pokemon?</h1>
    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
    <PokemonOptions :pokemons="pokemonArr" @selection="checkAnswer" />
    <template v-if="showAnswer">
      <h2>{{ message }}</h2>
      <button @click="newGame">New Game</button>
    </template>
  </div>
</template>

<script>
import PokemonPicture from '@/components/PokemonPicture.vue'
import PokemonOptions from '@/components/PokemonOptions.vue'
import getPokemonsOptions from '@/helpers/getPokemonOptions'
console.log(getPokemonsOptions())
export default {
  components: {
    PokemonOptions,
    PokemonPicture,
  },
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: '',
    }
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonsOptions()
      const rndInt = Math.floor(Math.random() * 4)
      this.pokemon = this.pokemonArr[rndInt]
    },
    checkAnswer(pokemonId) {
      pokemonId ? (this.showPokemon = true) : (this.showPokemon = false)
      this.showAnswer = true
      if (pokemonId === this.pokemon.id) {
        this.message = `Wing, ${this.pokemon.name}`
      } else {
        this.message = `Sorry you lost, Was is ${this.pokemon.name}`
      }
    },
    newGame() {
      this.showAnswer = false
      this.showPokemon = false
      this.pokemon = null
      this.mixPokemonArray()
    },
  },
  mounted() {
    this.mixPokemonArray()
  },
}
</script>

<style></style>
