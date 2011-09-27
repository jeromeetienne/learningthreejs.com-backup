// This source is the javascript needed to build a simple moving
// mesh in **three.js** based on this
// [example](https://raw.github.com/mrdoob/three.js/master/examples/canvas_geometry_mesh.html)
// It is the source about this [blog post](/blog/2011/08/06/lets-do-a-mesh/).

// ## Now lets start

// declare a bunch of variable we will need later
var startTime	= Date.now();
var container;
var camera, scene, renderer, stats;
var keyboard, devOrientation;
var player;
var mesh;

// ## bootstrap functions
// initialiaze everything
init();
// make it move			
animate();

// ## Initialize everything
function init() {
	// test if webgl is supported
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	// create the camera
	camera = new THREE.Camera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 350;

	// create the Scene
	scene = new THREE.Scene();

	devOrientation	= new THREEx.DeviceOrientationState();
	keyboard	= new THREEx.KeyboardState();
	player		= new Player();

	// add the object to the scene
	scene.addObject( player.mesh );

	// create the container element
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	// init the WebGL renderer and append it to the Dom
	renderer = new THREE.WebGLRenderer({
		antialias	: true
	});
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	
	// init the Stats and append it to the Dom - performance vuemeter
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild( stats.domElement );
}

// ## Animate and Display the Scene
function animate() {
	// render the 3D scene
	render();
	// relaunch the 'timer' 
	requestAnimationFrame( animate );
	// update the stats
	stats.update();
}


// ## Render the 3D Scene
function render() {
	
	player.update();
	// actually display the scene in the Dom element
	renderer.render( scene, camera );
}
