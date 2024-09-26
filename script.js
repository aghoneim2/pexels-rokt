/**
 * Backend wrapper server to not expose API_KEY
 */

const port = 3000;
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json("server up");
});

/**
 * Express Package will create the server for us.
 * Dotenv Pack allows us to load enviornment variables with zero-dependencies
 * Axios will be used to access Pexels API
 * Cors required to handel CORS Access error
 */

/**
 * Get Curated List of photos for specified page
 */
app.get("/getPhotos", (req, res) => {
  //pass params using req
  const page = req.query.page;
  const options = {
    method: "GET",
    url: `https://api.pexels.com/v1/curated?page=${page}&per_page=10`,
    headers: {
      Authorization: process.env.API_KEY,
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
      console.log(response.data);
    })
    .catch((err) => {
      res.json("ERROR");
      console.log(err);
    });
});

/**
 * Trigger a search for input query and specified page
 */
app.get("/search", (req, res) => {
  //pass params below
  //req.query.XXXXX
  const query = req.query.query;
  const page = req.query.page;
  const options = {
    method: "GET",
    url: `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=10`,
    headers: {
      Authorization: process.env.API_KEY,
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
      console.log(response);
    })
    .catch((err) => {
      res.json("ERROR");
      console.log(err);
    });
});

/**
 * Activate Server On Specified port and listen for requests
 */
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
