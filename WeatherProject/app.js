const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: "true" }));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const appID = "2578bd55415b6c9c3b04ec8c4ea549e4";
  const unit = "metric";

  const url = `https://api.openweathermap.org/data/2.5/weather?appid=${appID}&q=${query}&units=${unit}`;

  https.get(url, (response) => {
    response.on("data", (data) => {
      const wheatherData = JSON.parse(data);
      const temp = wheatherData.main.temp;
      const desc = wheatherData.weather[0].description;
      const icon = wheatherData.weather[0].icon;

      const imgURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      res.write(
        `<h1>The temperature in ${query} is  ${temp}   degrees Celcius.</h1>`
      );

      res.write(`<img src=${imgURL} width="300px"/>`);
      res.write(`<h2>The weather is currently ${desc}</h2>`);
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("server runing on 3000");
});
