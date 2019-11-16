var ACCESS_TOKEN = "pk.eyJ1Ijoic2NyYXBweXBsZWFzZSIsImEiOiJjazMwZ3c4OGEwN2pyM25yY3U0N3Fqb2h6In0.ZpsqtTQg6Mbt6iTwqYye2w";
mapboxgl.accessToken = ACCESS_TOKEN;

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/scrappyplease/ck30ioijq0zat1co8mgfrtfg4",
  center: [10.212405079081918, 56.15020856422052],
  zoom: 16
});

async function getData() {
  let response = await fetch('http://134.209.242.120');
  if (response.ok) { 
    let json = await response.json();

    json.forEach(function(marker) {

      var popupHtml = '<img height="270px" width="270px" src="http://134.209.242.120'+ marker.imageURL +'"></img>'
      var popup = new mapboxgl.Popup({offset: 25}).setHTML(popupHtml);

      let el = document.createElement('div');

      if (marker.type == 'large' ) {
        el.className = 'map-marker__large';
      } else if (marker.type == 'small' ) {
        el.className = 'map-marker__small';
      } else  if (marker.type == 'medium' ) {
        el.className = 'map-marker__medium';
      }
  
      new mapboxgl.Marker(el)
      .setLngLat(marker.geo)
      .addTo(map)
      .setPopup(popup);


    });
  } else {
    alert("HTTP-Error: " + response.status);
  }
}

getData();
