

const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = 'pk.eyJ1Ijoic2NyYXBweXBsZWFzZSIsImEiOiJjazMwZ3c4OGEwN2pyM25yY3U0N3Fqb2h6In0.ZpsqtTQg6Mbt6iTwqYye2w';

const map = new mapboxgl.Map({
  container: 'app-map',
  style: 'mapbox://styles/mapbox/streets-v11'
});