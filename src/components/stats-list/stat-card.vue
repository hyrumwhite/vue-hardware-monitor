<template>
  <div class="stat-card" :style="tempStyle">{{ number }}</div>
</template>

<script>
export default {
  props: ["number"],
  data() {
    return {
      maxTemp: 90,
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
        "--temperature-hue": tempPercent,
      };
    },
  },
};
</script>

<style scoped>
.stat-card {
  width: 225px;
  height: 225px;
  color: white;
  font-size: 8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(
    circle closest-side,
    hsl(var(--temperature-hue), var(--saturation), var(--brightness)),
    hsl(var(--background-hue), var(--saturation), 10%)
  );
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border-radius: 20rem;
  transition: background 0.5s;
  border: 4px solid white;
}
</style>
