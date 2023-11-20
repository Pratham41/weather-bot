const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");
const botRoutes = require("./routes/bot.routes");
const botUserRoutes = require("./routes/botUsers.routes");
const Botusers = require("./models/botUser.model");

require("./config/db");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/bot", botRoutes);
app.use("/bot/users", botUserRoutes);

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  try {
    const createdUser = await Botusers.create({
      userId,
      name: `${msg.from.first_name + msg.from.last_name}`,
    });
    if (!createdUser) {
      bot.sendMessage(chatId, `Please try after some time...`);
    } else {
      bot.sendMessage(
        chatId,
        `Welcome to the Bot ${msg.from.first_name}\n\n If you want to get current weather updates please type 'weather'.\n\nWhenever you want to unsubscribe just type 'exit'`
      );
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    bot.sendMessage(
      chatId,
      "Error fetching weather data. Please try again later."
    );
  }
});

bot.onText(/\weather/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  try {
    const checkSubscribed = await Botusers.find({
      userId: userId,
      isSubscribed: true,
    });
    if (checkSubscribed.length) {
      const weatherData = await getWeatherData();
      console.log('msg---',msg);
      bot.sendMessage(chatId, `Latest Weather Update:\n${weatherData}`);
    } else {
      bot.sendMessage(
        chatId,
        `Hi ${msg.from.first_name} \n\nYou need to subscribe to avail this feature.\n To subscribe please type '/start'`
      );
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    bot.sendMessage(
      chatId,
      "Error fetching weather data. Please try again later."
    );
  }
});

bot.onText(/\exit/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  try {
    const deletedUser = await Botusers.deleteOne({ userId: userId });
    if (!deletedUser) {
      bot.sendMessage(chatId, `Please try after some time...`);
    } else {
      bot.sendMessage(
        chatId,
        `You have successfully unsubscribed. You will not receive any updates in future.`
      );
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    bot.sendMessage(
      chatId,
      "Error fetching weather data. Please try again later."
    );
  }
});

async function getWeatherData() {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${process.env.CITY}&appid=${process.env.WEATHER_API_KEY}`;

  let res = await fetch(apiUrl);
  const data = await res.json();
  console.log(data);
  const weatherInfo = `Current weather in ${process.env.CITY}: ${
    data.weather[0].description
  }, Temperature: ${kelvinToCelsius(data.main.temp)}°C`;
  console.log(weatherInfo);
  return weatherInfo;
}

function kelvinToCelsius(kelvin) {
  return roundToDecimalPlaces(kelvin - 273.15, 2);
}
function roundToDecimalPlaces(value, decimalPlaces) {
  const multiplier = 10 ** decimalPlaces;
  return Math.round(value * multiplier) / multiplier;
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
