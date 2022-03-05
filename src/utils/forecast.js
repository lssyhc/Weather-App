const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=e9e7dc3f6205eef7a55f1c5df067287a&lang=id&units=metric`;

  request({ url: url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Tidak dapat terhubung ke layanan cuaca!", undefined);
    } else if (body.error) {
      callback("Tidak bisa menemukan lokasi.", undefined);
    } else {
      callback(
        undefined,
        `${body.weather[0].description}. Saat ini ${body.main.temp} derajat. Terasa seperti ${body.main.feels_like} derajat. Kelembabannya adalah ${body.main.humidity}%.`
      );
    }
  });
};

module.exports = forecast;
