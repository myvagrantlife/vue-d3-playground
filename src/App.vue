<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Dots</router-link>
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
  height: 10vh;
  padding: 30px;

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
  height: 90vh;
}

svg {
  overflow: visible;
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
