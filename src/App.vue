<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Dots</router-link>
      <router-link to="/graph">Graph</router-link>
      <router-link to="/arc">Arc</router-link>
      <router-link to="/pie">Pie</router-link>
    </div>
    <div id="wrapper">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  height: 5vh;
  padding: 30px;
  border-bottom:1px solid #ececec;

  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 0 10px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#wrapper {
  height: 95vh;
}

svg {
  overflow: hidden;
}

.value-slider {
  border: 1px dashed rgba(#fff, 0.5);
  padding: 5px;
  border-radius: 3px;
  margin-top: 10px;

  label {
    margin-bottom: 5px;
    display: block;
    font-size: 0.7rem;
    font-weight: bold;
    text-transform: uppercase;
  }

  input {
    width: 100%;
  }
}
</style>
