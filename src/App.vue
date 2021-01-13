<template>
  <div id="app">
    <!-- <div id="nav"> -->
      
      <!-- <router-link to="/">Login</router-link> | -->
      <!-- <router-link to="/home">Home</router-link> -->
    <!-- </div> -->
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  // background-image: url(./img/login_p1.jpg);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-size: cover;
  background-position: center;
}

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
