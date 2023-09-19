
// Global variable to store the gallery object. The gallery object is
// a container for all the visualisations.
//Data from Municipal Environment Agency from Goiânia, Goias, Brazil

var gallery;

function setup() {
    
  angleMode(DEGREES);
  rectMode(CORNER);
    
  // Create a canvas to fill the content div from index.html.
  canvasContainer = select('#app');
  var c = createCanvas(1024, 900);
  c.parent('app');

  // Create a new gallery object.
  gallery = new Gallery();

  // Add the visualisation objects here.
  gallery.addVisual(new AMMA()); //Working here to understant the data visualization
  gallery.addVisual(new AmmaPieCharts());
  gallery.addVisual(new AmmaSetores());  
}

function draw() {
  background(255);
  if (gallery.selectedVisual != null) {
    gallery.selectedVisual.draw();
  }
}
