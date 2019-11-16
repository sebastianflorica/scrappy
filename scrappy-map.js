

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
    type: 'Large',
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
    type: 'Medium',
    geometry: {
      type: 'Point',
      coordinates: [10.193591, 56.127352]
    },
    properties: {
      title: 'Wardrobe',
      // description: 'Just some wardrobe left on the streets'
    }
  },
  {
    type: 'Small',
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

async function please() {
  let response = await fetch('http://134.209.242.120');
  if (response.ok) { // if HTTP-status is 200-299
    // get the response body (the method explained below)
    var json = await response.json();
    json.forEach(function(marker) {
    
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
      .setLngLat(marker.geo)
      .addTo(map);
    });
  } else {
    alert("HTTP-Error: " + response.status);
  }
}

please();