<template>
  <div id="app">
    <News :apiKey="apiKey"></News>
  </div>
</template>

<script>
import News from './components/News'

export default {
  name: 'App',
  components: {
    News
  },
  data() {
    return {
       apiKey: '5887a299d4564fe7bafbfcf3d2f31148' // You need an API Key from newsapi.org
    }
  }
}
</script>

<style>

@import url('https://use.fontawesome.com/releases/v5.7.2/css/all.css');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
