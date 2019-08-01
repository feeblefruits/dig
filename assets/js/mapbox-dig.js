  const {DeckGL, HexagonLayer} = deck;

  const deckgl = new DeckGL({
    mapboxApiAccessToken: 'pk.eyJ1IjoibWdkZXYiLCJhIjoiY2p4dzBpbnY1MDBnNzNrbXhqODhuNXBuOSJ9.WR7-Mdn3rIfJeps_BNUEBg',
    mapStyle: 'mapbox://styles/mapbox/dark-v9',
    longitude: 28.2336,
    latitude: -29.6100,
    zoom: 5.5,
    minZoom: 5,
    maxZoom: 15,
    pitch: 40
  });

  const COLOR_RANGE = [
    [254, 164, 110],
    [242, 54, 53],
    [209, 0, 31]
  ];

  data = d3.csv('https://raw.githubusercontent.com/feeblefruits/dig/master/data/claimants_coordinates_v3.csv')

  const hexagonLayer = new HexagonLayer({
    id: 'heatmap',
    colorRange: COLOR_RANGE,
    data: data,
    radius: 10000,
    coverage: 1,
    upperPercentile: 99,
    elevationRange: [0, 1000],
    elevationScale: 1000,
    extruded: true,
    getPosition: d => [Number(d.Longitude), Number(d.Latitude)],
    opacity: 0.6,
  });

  deckgl.setProps({
    layers: [hexagonLayer]
  });
