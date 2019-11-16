async function please() {
  let response = await fetch('http://134.209.242.120');

  if (response.ok) { // if HTTP-status is 200-299
    // get the response body (the method explained below)
    var json = await response.json();
    console.log(json)
  } else {
    alert("HTTP-Error: " + response.status);
  }
}




const ACCESS_TOKEN = "pk.eyJ1Ijoic2NyYXBweXBsZWFzZSIsImEiOiJjazMwZ3c4OGEwN2pyM25yY3U0N3Fqb2h6In0.ZpsqtTQg6Mbt6iTwqYye2w";

mapboxgl.accessToken = ACCESS_TOKEN;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/scrappyplease/ck30ioijq0zat1co8mgfrtfg4",
  center: [10.212405079081918, 56.15020856422052],
  zoom: 11
});

please().then((json) => {
  json.items.forEach(function (marker) {
    let el = document.createElement('div');
    el.className = 'map-marker';
    new mapboxgl.Maker(el).setLngLat(marker.geometry.coordinates).addTo(map);
  });
});

// THIS CODE IS ADDING PINS TO THE MAP
// geojson.items.forEach(function(marker) {

  
  var el = document.createElement('div');
  
  if (marker.type == 'Large' ) {
    el.className = 'map-marker';
  } else if (marker.type == 'Small' ) {
    el.className = 'map-marker__red';
  } else {
    el.className = 'map-marker__shrek';
  }

  // make a marker for each item and add to the map
  new mapboxgl.Marker(el)
  .setLngLat(marker.geometry.coordinates)
  .addTo(map);
});
  
