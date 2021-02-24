const express = require("express");
const fetch = require("node-fetch");

const server = express();
const PORT = 8084;

server.use(express.static("public"));

server.get("/data", async (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  let response = await fetch("http://10.0.0.8:8085/data.json");
  if (response.ok) {
    let json = await response.json();
    let hardware = json.Children[0].Children;
    let cpu = {};
    let gpu = {};
    for (let item of hardware) {
      if (item.ImageURL.includes("cpu")) {
        for (let { Text, Children } of item.Children) {
          cpu[Text] = Children;
        }
      } else if (
        item.ImageURL.includes("nvidia") ||
        item.ImageURL.includes("amd")
      ) {
        for (let { Text, Children } of item.Children) {
          gpu[Text] = Children;
        }
      }
    }
    let { Temperatures } = gpu;
    let [entry] = Temperatures;
    const { Min: min, Value: value, Max: max } = entry;
    gpu = {
      min: parseInt(min),
      value: parseInt(value),
      max: parseInt(max),
    };

    Temperatures = cpu.Temperatures;
    let [cpuTemp, ccdTemp] = Temperatures;
    const { Min: cpuMin, Value: cpuValue, Max: cpuMax } = cpuTemp;
    cpu = {
      min: parseInt(cpuMin),
      value: parseInt(cpuValue),
      max: parseInt(cpuMax),
    };

    res.send({ gpu, cpu });
  }
});

server.listen(PORT);
console.log(`server running on port: ${PORT}`);
