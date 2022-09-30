<template>
  <nav>
    <NavBar :baseURL="baseURL"/>
  </nav>

  <body style="background-color: gainsboro;">
    <router-view :baseURL="baseURL" @fetchData="fetchData"></router-view>
  </body>


</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
  data() {
    return {
      baseURL: "http://localhost:8080/", // base URL for backend server
      token: null,
    };
  },
  methods: {
    fetchData() {
      // this.token = localStorage.getItem("token")
    }
  },
  components: { NavBar }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
