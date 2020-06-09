

var base = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 22,
  id: "mapbox.light",
  accessToken: API_KEY
})

var r;
function markerSize(c) {
  if  (c < 100){
    r =c*300
  }
  else if  (c < 1000){
    r =c*50
  }
  else if  (c < 5000){
    r =c*30
  }
  else{
    r=c*2
  }
  return r
}

var url = "https://opendata.arcgis.com/datasets/628578697fb24d8ea4c32fa0c5ae1843_0.geojson"

d3.json(url, function(response) {

  // console.log(response);
  var Markers10 = L.layerGroup();
  var Markers100 = L.layerGroup();
  var Markers1000 = L.layerGroup();
  var Markers10000 = L.layerGroup();
  var heatArray = [];
  var features = response.features;

  for (var i = 0; i < features.length; i++) {
    var data = features[i].properties;
    var location = [data.Lat, data.Long_,data.Confirmed];
// console.log(location)
    if (data.Lat) {
      heatArray.push(location);
      
      var t1 = L.circle([data.Lat, data.Long_], {
        // stroke: false,
        fillOpacity: 0.75,
        color: "purple",
        opacity:1,
        weight:1,
        fillColor: "pink",
        radius: markerSize(data.Confirmed)
      })
          .bindPopup("<h3>City: "+data.Admin2
          +"</h3><hr>State: "
          + data.Province_State
          +"<br>Confirmed: "+ data.Confirmed)

      if (data.Confirmed<10){

          t1.addTo(Markers10);
        }
        else if (data.Confirmed<100){

          t1.addTo(Markers100);
        }
        else if (data.Confirmed<1000){

          t1.addTo(Markers1000);

          }
          else{
            
            t1.addTo(Markers10000);
          }
        }
        // Markers10000.bindPopup(data.Confirmed);
    }
  // console.log(Markers10)
    var heat = L.heatLayer(heatArray, {
      radius: 20,
      blur: 35
    })
    // .addTo(myMap);

    // var marker10 = L.layerGroup(Markers10);
    // var marker100 = L.layerGroup(Markers100);
    // var marker1000 = L.layerGroup(Markers1000);
    // var marker10000 = L.layerGroup(Markers10000);

    // var heapMap = L.layerGroup(heat);


  var baseMaps = {
    // "Street Map": streetmap,
    "Street Map": base
  };

  // Create an overlay object
  var overlayMaps = {
    "heat Map": heat,
    "Less than 10": Markers10,
    "Less than 100": Markers100,
    "Less than 1000": Markers1000,
    "Less than 10000": Markers10000,

  };

  var myMap = L.map("map", {
    center: [39.8283, -98.5795],
    zoom: 5,
    layers: [base, heat,Markers1000,Markers10000]

  });
  // Define a map object
  // var myMap = L.map("map", {
  //   center: [37.09, -95.71],
  //   zoom: 5,
  //   layers: [base, marker, heapMap]
  // });

  // Pass our map layers into our layer control
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
  // heat.addTo(myMap);
});
