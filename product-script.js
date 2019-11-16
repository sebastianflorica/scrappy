async function getData() {
  let response = await fetch('http://134.209.242.120');
  if (response.ok) { 
    let json = await response.json();

    json.forEach(function(marker) {

      var node = document.createElement("div");  
      node.classList.add('product');
      // var img = document.createElement("img");  
      // img.setAttribute("src", `http://134.209.242.120${marker.imageURL}`);
      // node.appendChild(img); 
      node.style.background = `url('http://134.209.242.120${marker.imageURL}') center center no-repeat`;                           
      document.getElementById("products").appendChild(node);

    });
  } else {
    alert("HTTP-Error: " + response.status);
  }
}

getData();

