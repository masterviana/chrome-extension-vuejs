<template>
  <div class="main_app">
    <h1>Other Page {{msg}}</h1>
    <router-link to="/login">Go to Home</router-link>
    <router-link to="/about">Go to About</router-link>



  </div>
</template>

<script>



export default {
  name: 'popupView',
  data () {
    return {
      msg: 'Other page'
    }
  }
}

</script>

<style>
.main_app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
