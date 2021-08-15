const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.get("/characters", async (req, res) => {
  try {
    if (!req.query.skip) req.query.skip = 0;
    if (!req.query.name) req.query.name = "";
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.YOUR_API_KEY}&skip=${req.query.skip}&name=${req.query.name}`
    );
    console.log(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.YOUR_API_KEY}&skip=${req.query.skip}&name=${req.query.name}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/comics", async (req, res) => {
  try {
    if (!req.query.skip) req.query.skip = 0;
    if (!req.query.title) req.query.title = "";
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.YOUR_API_KEY}&skip=${req.query.skip}&title=${req.query.title}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/comics/:characterID", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params}?apiKey=${process.env.YOUR_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log("server is running");
});
