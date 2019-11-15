const ACCESS_TOKEN = "pk.eyJ1Ijoic2NyYXBweXBsZWFzZSIsImEiOiJjazMwZ3c4OGEwN2pyM25yY3U0N3Fqb2h6In0.ZpsqtTQg6Mbt6iTwqYye2w";

mapboxgl.accessToken = ACCESS_TOKEN;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/scrappyplease/ck30ioijq0zat1co8mgfrtfg4",
  center: [10.212405079081918, 56.15020856422052],
  zoom: 11
});

const geojson = {
  type: 'Items to collect',
  items: [{
    type: 'Big item',
    geometry: {
      type: 'Point',
      coordinates: [10.183491, 56.127352]
    },
    properties: {
      title: 'Wardrobe',
      // description: 'Just some wardrobe left on the streets'
    }
  },
  {
    type: 'Small item',
    geometry: {
      type: 'Point',
      coordinates: [10.212405079081918, 56.15020856422052]
    },
    properties: {
      title: 'Small item',
      // description: 'Your moms underpants haha'
    }
  }]
}

// THIS CODE IS ADDING PINS TO THE MAP
geojson.items.forEach(function(marker) {

  
  var el = document.createElement('div');

  if (marker.type == 'Big item' ) {
    el.className = 'map-marker';
  } else {
    el.className = 'map-marker__red';
  }

  // make a marker for each item and add to the map
  new mapboxgl.Marker(el)
  .setLngLat(marker.geometry.coordinates)
  .addTo(map);
});
  