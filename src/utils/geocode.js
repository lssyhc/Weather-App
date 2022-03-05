const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibHNzeWhjIiwiYSI6ImNsMDV5Z2YyaDBwYXgzaW50OWNwbmQzdmQifQ.dYyjMCLW1qCfFlsGRZSp3A&limit=1`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Tidak dapat terhubung ke layanan cuaca!", undefined);
    } else if (body.features.length === 0) {
      callback("Tidak bisa menemukan lokasi. Coba pencarian lain.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
