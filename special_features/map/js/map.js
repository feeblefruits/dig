
mapboxgl.accessToken = 'pk.eyJ1IjoibWdkZXYiLCJhIjoiY2p4dzBpbnY1MDBnNzNrbXhqODhuNXBuOSJ9.WR7-Mdn3rIfJeps_BNUEBg';

var { MapboxLayer, HexagonLayer } = deck;

//Create the Mapbox map
var map = new mapboxgl.Map({
    container: 'scroll-map',
    style: 'mapbox://styles/mapbox/dark-v10?optimize=true',
    center: [26.9584, -24.7299],
    zoom: 4,
    pitch: 10,
    bearing: 0,
    antialias: true
});

// Get Data for visual
data = d3.csv('https://raw.githubusercontent.com/feeblefruits/dig/master/data/claimants_coordinates_v3.csv')

//Create the deck.gl hexagon layer and style for the data
var COLOR_RANGE = [
[1, 152, 189],
[255,255,0],
[209, 55, 78]
];

var LIGHT_SETTINGS = {
    lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
    ambientRatio: 0.4,
    diffuseRatio: 0.6,
    specularRatio: 0.2,
    lightsStrength: [0.8, 0.0, 0.8, 0.0],
    numberOfLights: 2
};

var hexagonLayer;

//Add the deck.gl Custom Layer to the map once the Mapbox map loads
scroll-map.on('style.load', () => {

    hexagonLayer = new MapboxLayer({
        id: 'heatmap',
        type: HexagonLayer,
        colorRange: COLOR_RANGE,
        data: data,
        radius: 10000,
        coverage: 1,
        upperPercentile: 99.5,
        elevationScale: 1000,
        extruded: true,
        getPosition: d => [Number(d.Longitude), Number(d.Latitude)],
        opacity: 0.5,
        lightSettings: LIGHT_SETTINGS,
        opacity: 1
    });

    // Add the deck.gl hex layer below labels in the Mapbox map
    map.addLayer(hexagonLayer, 'waterway-label');
});

var chapters = {
'africa': {
duration: 3000,
center: [26.9584, -24.7299],
zoom: 4,
pitch: 10,
bearing: 0
},
'eswatini': {
duration: 3000,
center: [31.4630, -26.5179],
zoom: 8,
pitch: 45,
bearing: 20
},
'lesotho': {
duration: 3000,
bearing: 100,
center: [27.9869, -29.4151],
zoom: 5,
zoom: 7,
speed: 0.6,
pitch: 60
},
'eastern-cape': {
duration: 3000,
center: [28.7781, -31.6067],
zoom: 4,
bearing: 60,
zoom: 6.5,
bearing: 100,
pitch: 60
}
};
 
// On every scroll event, check which element is on screen
window.onscroll = function() {
var chapterNames = Object.keys(chapters);
  for (var i = 0; i < chapterNames.length; i++) {
var chapterName = chapterNames[i];
  if (isElementOnScreen(chapterName)) {
  setActiveChapter(chapterName);
  break;
}
}
};
 
var activeChapterName = 'africa';
  function setActiveChapter(chapterName) {
  if (chapterName === activeChapterName) return;
 
  map.flyTo(chapters[chapterName]);
 
  document.getElementById(chapterName).setAttribute('class', 'active');
  document.getElementById(activeChapterName).setAttribute('class', '');
 
  activeChapterName = chapterName;
  }
 
function isElementOnScreen(id) {
  var element = document.getElementById(id);
  var bounds = element.getBoundingClientRect();
  return bounds.top < window.innerHeight && bounds.bottom > 0;
  }
