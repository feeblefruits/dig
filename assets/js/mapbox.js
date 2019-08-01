// Mapbox Map
const {DeckGL, HexagonLayer} = deck;

var map = new DeckGL({
  mapboxApiAccessToken: 'pk.eyJ1IjoibWdkZXYiLCJhIjoiY2p4dzBpbnY1MDBnNzNrbXhqODhuNXBuOSJ9.WR7-Mdn3rIfJeps_BNUEBg',
  mapStyle: 'mapbox://styles/mapbox/dark-v9',
  container: 'map',
  longitude: 28.2336,
  latitude: -29.6100,
  zoom: 5.5,
  minZoom: 5,
  maxZoom: 15,
  pitch: 40,
  scrollZoom: false,
  boxZoom: false,
  doubleClickZoom: false
});

const COLOR_RANGE = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 173, 84],
  [209, 55, 78]
];

data = d3.csv('https://raw.githubusercontent.com/feeblefruits/dig/master/data/claimants_coordinates_v3.csv')

const hexagonLayer = new HexagonLayer({
  id: 'heatmap',
  colorRange: COLOR_RANGE,
  data: data,
  radius: 10000,
  coverage: 1,
  upperPercentile: 99,
  elevationScale: 1000,
  extruded: true,
  getPosition: d => [Number(d.Longitude), Number(d.Latitude)],
  opacity: 0.1,
});

map.setProps({
  layers: [hexagonLayer]
});
