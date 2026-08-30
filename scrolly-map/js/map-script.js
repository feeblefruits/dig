var chapters = {
  'lesotho-eastern-cape': {
    duration: 3000,
    center: [28.6790, -30.1115],
    zoom: 7.2,
    pitch: 10,
    bearing: 0
  },
  'introduction': {
    duration: 3000,
    center: [28.6790, -30.1115],
    zoom: 7.2,
    bearing: 20,
    pitch: 150
  },
  'zimbabwe': {
    duration: 3000,
    center: [32.6334, -20.1914],
    zoom: 8,
    pitch: 45,
    bearing: 40
  },
  'botswana': {
    duration: 3000,
    center: [25.1966, -25.3430],
    zoom: 8,
    pitch: 50,
    bearing: 80
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
    zoom: 7,
    speed: 0.6,
    pitch: 60
  },
  'eastern-cape': {
    duration: 3000,
    center: [28.7781, -31.6067],
    zoom: 6.5,
    bearing: 30,
    pitch: 70
  }
};

mapboxgl.accessToken = window.MAPBOX_ACCESS_TOKEN;

if (!mapboxgl.accessToken || mapboxgl.accessToken === 'YOUR_MAPBOX_PUBLIC_TOKEN') {
  throw new Error('Set MAPBOX_ACCESS_TOKEN in scrolly-map/js/map-config.js');
}

var MapboxLayer = deck.MapboxLayer;
var HexagonLayer = deck.HexagonLayer;

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v11',
  center: [28.6790, -30.1115],
  zoom: 7.2,
  pitch: 10,
  bearing: 0,
  antialias: true,
  interactive: false
});

var COLOR_RANGE = [
  [238, 115, 101],
  [233, 74, 55],
  [213, 44, 24]
];

var LIGHT_SETTINGS = {
  lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
  ambientRatio: 0.4,
  diffuseRatio: 0.6,
  specularRatio: 0.2,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2
};

function addHexagonLayer(rows) {
  var hexagonLayer = new MapboxLayer({
    id: 'heatmap',
    type: HexagonLayer,
    data: rows,
    pickable: false,
    extruded: true,
    radius: 10000,
    coverage: 1,
    upperPercentile: 99.5,
    elevationScale: 1000,
    colorRange: COLOR_RANGE,
    getPosition: function (d) {
      return [Number(d.Longitude), Number(d.Latitude)];
    },
    opacity: 0.9,
    lightSettings: LIGHT_SETTINGS
  });

  map.addLayer(hexagonLayer, 'waterway-label');
}

map.on('load', function () {
  d3.csv('../data/claimants_coordinates_v3.csv').then(addHexagonLayer);
});

var activeChapterName = 'lesotho-eastern-cape';

function setActiveChapter(chapterName) {
  if (chapterName === activeChapterName) {
    return;
  }

  map.flyTo(chapters[chapterName]);
  document.getElementById(chapterName).setAttribute('class', 'map-chapter active');
  document.getElementById(activeChapterName).setAttribute('class', 'map-chapter');
  activeChapterName = chapterName;
}

function isElementOnScreen(id) {
  var element = document.getElementById(id);
  var bounds = element.getBoundingClientRect();
  return bounds.top < window.innerHeight && bounds.bottom > 0;
}

window.onscroll = function () {
  var chapterNames = Object.keys(chapters);
  for (var i = 0; i < chapterNames.length; i++) {
    if (isElementOnScreen(chapterNames[i])) {
      setActiveChapter(chapterNames[i]);
      break;
    }
  }
};

map.scrollZoom.disable();
