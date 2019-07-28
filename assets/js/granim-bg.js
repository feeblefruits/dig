// Granim background
var granimInstance = new Granim({
  element: '#canvas-image',
  direction: 'top-bottom',
  image : {
      source: '../dig/assets/tersius-van-rhyn-unsplash.jpg',
      blendingMode: 'multiply',
      stretchMode: ['stretch', 'stretch-if-bigger'],
      position: ['center', 'center']
  },
  states : {
      "default-state": {
          gradients: [
          	['#000000', '#0d0f1c'],
          	['#000000', '#0d0f1c'],
              ['#ff0000', '#a10000'],
              ['#ff0000', '#a10000'],
              ['#ff0000', '#a10000'],
          ],
          transitionSpeed: 2500,
          loop: true
      }
  }
});
