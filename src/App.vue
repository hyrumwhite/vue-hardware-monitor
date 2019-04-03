<template>
  <div id="app">
    <StatCard :number="25 + random"/>
    <StatCard :number="58 + random"/>
    <StatCard :number="93 + random"/>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import StatCard from "./components/stats-list/stat-card.vue";
export default {
  name: "app",
  components: {
    StatCard
  },
  data() {
    return {
      random: 0
    };
  },
  mounted() {
    window.setInterval(() => {
      this.random = Math.floor(Math.random() * 70);
    }, 1000);
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
}
</style>
