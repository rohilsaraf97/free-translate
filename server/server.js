const PORT = 8000;
const axios = require("axios").default;
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.get("/languages", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://deep-translate1.p.rapidapi.com/language/translate/v2/languages",
    headers: {
      "X-RapidAPI-Host": process.env.API_HOST,
      "X-RapidAPI-Key": process.env.API_KEY,
    },
  };

  try {
    const response = await axios(
      "https://deep-translate1.p.rapidapi.com/language/translate/v2/languages",
      options
    );
    res.status(200).json(response.data.languages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

app.get("/translations", async (req, res) => {
  const { enteredText, srcKey, targetKey } = req.query;
  console.log(req.query);
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Host": process.env.API_HOST,
      "X-RapidAPI-Key": process.env.API_KEY,
    },
    data: { q: enteredText, source: srcKey, target: targetKey },
  };

  try {
    const response = await axios(
      "https://deep-translate1.p.rapidapi.com/language/translate/v2",
      options
    );
    res.status(200).json(response.data.data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

app.listen(PORT, () => {
  console.log("Server Running on port 8000");
});
