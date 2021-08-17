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
    if (!req.query.limit) req.query.limit = 100;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.YOUR_API_KEY}&skip=${req.query.skip}&limit=${req.query.limit}&name=${req.query.name}`
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
    if (!req.query.limit) req.query.limit = 100;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.YOUR_API_KEY}&skip=${req.query.skip}&limit=${req.query.limit}&title=${req.query.title}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/comics/:characterID", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterID}?apiKey=${process.env.YOUR_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log("server is running");
});
