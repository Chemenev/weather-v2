<template>
  <router-link to="/">Weather</router-link>
  <router-link to="/rates">Rates</router-link>
  <router-view></router-view>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: 'App',
  async created(){
    this.fetchWeather();
    this.fetchRates();
  },
  methods:{
    ...mapActions('weather',['fetchWeather']),
    ...mapActions('exchangeRates',['fetchRates'])
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 2vh 20vh;
} 

*{
  box-sizing: border-box;
}
</style>
