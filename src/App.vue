<template>
	<div id="app">
		<div>
			<h1 style="margin-top: 0px">CPU</h1>
			<StatCard :number="cpu.value" />
			<h2>Max: {{ cpu.max }}</h2>
		</div>
		<div>
			<h1 style="margin-top: 0px">GPU</h1>
			<StatCard :number="gpu.value" />
			<h2>Max: {{ gpu.max }}</h2>
		</div>
	</div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import StatCard from "./components/stats-list/stat-card.vue";
export default {
	name: "app",
	components: {
		StatCard,
	},
	data() {
		return {
			random: 0,
			gpu: {},
			cpu: {},
		};
	},
	async created() {
		this.getTemps();
		window.setInterval(this.getTemps, 1500);
	},
	methods: {
		async getTemps() {
			const response = await fetch("http://localhost:8084/data");
			if (response.ok) {
				const json = await response.json();
				this.cpu = json.cpu;
				this.gpu = json.gpu;
			}
		},
	},
};
</script>

<style src="./assets/main.css"></style>
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
	flex-wrap: wrap;
}
h1,
h2 {
	color: white;
	margin-bottom: 0px;
}
h1 {
	margin-bottom: 4px;
}
h2 {
	margin-top: 8px;
}
</style>
