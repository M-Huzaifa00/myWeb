const express = require("express");
const https = require("https")
const app = express()

app.get("/",(req,res)=>{
    let url = "https://api.openweathermap.org/data/2.5/weather?q=Chakwal&units=metric&appid=a9ef4dbd5339379386fc758b4740a1e9";
    https.get(url, (response)=>{
      console.log(response.statusCode);

      response.on("data",(data)=>{
        const weatherData = JSON.parse(data)
        let temprature = weatherData.main.temp;
        let description = weatherData.weather[0].description;
        let icon =  weatherData.weather[0].icon;
        let imgSrc =`https://openweathermap.org/img/wn/${icon}@2x.png`
        res.write("<p>The weather is currently  " + description + "</p>")
        res.write("<h1>The temp in Chakwal is : " + temprature + " celcius.</h1>")
        res.write(`<img src="${imgSrc}">`) 
        res.send();

      })
    })
})















app.listen(3000,()=>{
    console.log("Server started at local host : 3000");
})