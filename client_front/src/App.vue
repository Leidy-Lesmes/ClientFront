<template>
  <div id="app">
    <ClockCard />
  </div>
</template>

<script>
import ClockCard from "./components/ClockCard.vue";

export default {
  name: "App",
  components: {
    ClockCard, // Registra el componente ClockCard
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
