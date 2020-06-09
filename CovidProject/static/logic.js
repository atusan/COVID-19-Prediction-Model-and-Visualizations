// Create a map object
var myMap = L.map("map", {
  center: [36.737797, -119.787125],
  zoom: 6
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);

// Country data
var cities = [
  {
    name: "Los Angeles",
    location: [34.30828379, -118.2282411],
    Death: 457
  },
  {
    name: "San Diego",
    location: [32.715760, -117.163820],
    Death: 63
  },
  {
    name: "Santa Clara",
    location: [37.352390, -121.953079],
    Death: 69
  },
  {
    name: "Riverside",
    location: [33.74314981, -115.9933578],
    Death: 59
  },
  {
    name: "Orange",
    incident_rate: 108.52,
    location: [33.70147516, -117.7645998],
    Death: 17
  },
  
  {
    name: "San Joaquin",
    location: [37.93433732, -121.2730061],
    Death: 17
  },
  {
    name: "San Bernardino",
    location: [34.84060306, -116.1774685],
    Death: 47
  },

  {
    name: "Alameda",
    location: [37.64629437, -121.8929271],
    Death: 24
  },
];

// Loop through the cities array and create one marker for each city object
for (var i = 0; i < cities.length; i++) {

  // Conditionals for cities Death
  var color = "";
  if (cities[i].Death > 200) {
    color = "Red";
  }
  else if (cities[i].Death > 40) {
    color = "Pink";
  }
  else if (cities[i].Death > 10) {
    color = "Blue";
  }
  else {
    color = "Orange";
  }

  // Add circles to map
  L.circle(cities[i].location, {
    fillOpacity: 0.75,
    color: "white",
    fillColor: color,
    // Adjust radius
    radius: cities[i].Death * 500
  }).bindPopup("<h1>" + cities[i].name + "</h1> <hr> <h3>Deaths: " + cities[i].Death + "</h3>").addTo(myMap);
}
