const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Layanan Cuaca",
    name: "Cahyo Susilo",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Tentang Saya",
    name: "Cahyo Susilo",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Halaman Bantuan",
    helpText: "Ini adalah beberapa teks yang bermanfaat",
    name: "Cahyo Susilo",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Anda harus memberikan alamat",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Anda harus memasukkan pencarian",
    });
  }

  console.info(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Cahyo Susilo",
    errorMessage: "Artikel bantuan tidak ditemukan",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Cahyo Susilo",
    errorMessage: "Halaman tidak ditemukan",
  });
});

app.listen(port, () => {
  console.info(`Server aktif pada port ${port}`);
});
