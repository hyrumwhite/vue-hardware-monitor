<template>
  <div class="stat-card" :style="tempStyle">{{number}}</div>
</template>

<script>
export default {
  props: ["number"],
  data() {
    return {
      maxTemp: 100
    };
  },
  computed: {
    tempStyle() {
      if (this.number > this.maxTemp) {
        this.number = this.maxTemp;
      }
      let percent = this.number / this.maxTemp;
      let tempPercent = percent * 120;
      tempPercent = 120 - tempPercent;
      return {
        "--temperature-hue": tempPercent
      };
    }
  }
};
</script>

<style scoped>
.stat-card {
  width: 50vh;
  height: 50vh;
  color: white;
  font-size: 8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(
    circle closest-side,
    hsl(var(--temperature-hue), var(--saturation), var(--brightness)),
    hsl(var(--background-hue), var(--saturation), var(--brightness))
  );
  border-radius: 20rem;
  transition: background 0.5s;
}
</style>
