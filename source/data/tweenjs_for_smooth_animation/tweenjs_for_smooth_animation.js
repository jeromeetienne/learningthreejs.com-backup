// This source is the javascript needed to build a simple moving
// cube in **three.js** based on this
// [example](https://raw.github.com/mrdoob/three.js/master/examples/canvas_geometry_cube.html)
// It is the source about this [blog post](/blog/2011/08/06/lets-do-a-cube/).

// ## Now lets start

// declare a bunch of variable we will need later
var startTime	= Date.now();
var container;
var camera, scene, renderer, stats;
var cube;

// maybe replace that by window... or something
var userOpts	= {
	range		: 450,
	duration	: 2000,
	delay		: 0,
	easing		: TWEEN.Easing.Elastic.EaseInOut
};



// ## bootstrap functions
// initialiaze everything
init();
// make it move			
animate();


/**
 * Build ui with Data.GUI
*/
function buildGui(options, callback)
{
	var gui = new DAT.GUI({
		height	: 3 * 32 - 1 + 28
	});
	var change	= function(){
		callback(options)
	}

	gui.add(options, 'range').name('Range').min(64).max(1024)
		.onChange(change);
	gui.add(options, 'duration').name('Duration').min(200).max(4000)
		.onChange(change);
	gui.add(options, 'delay').name('Delay').min(0).max(4000)
		.onChange(change);


	// collect all available easing in TWEEN library
	var easings	= {};
	Object.keys(TWEEN.Easing).forEach(function(family){
		Object.keys(TWEEN.Easing[family]).forEach(function(direction){
			easings[family+'.'+direction]	= TWEEN.Easing[family][direction];
		});
	});
	// add 'easing'
	gui.add(options, 'easing').name('Easing').options(easings)
		.onChange(change);
}

function setupTween()
{
	var update	= function(){
		cube.position.x = current.x;
	}
	var current	= { x: userOpts.range };
	
	// remove previous tweens if needed
	TWEEN.removeAll();
	
	var tweenHead	= new TWEEN.Tween(current)
		.to({x: -userOpts.range}, userOpts.duration)
		.delay(userOpts.delay)
		.easing(userOpts.easing)
		.onUpdate(update);

	var tweenBack	= new TWEEN.Tween(current)
		.to({x: userOpts.range}, userOpts.duration)
		.delay(userOpts.delay)
		.easing(userOpts.easing)
		.onUpdate(update);

	// after tweenHead do tweenBack
	tweenHead.chain(tweenBack);
	// after tweenBack do tweenHead, so it is cycling
	tweenBack.chain(tweenHead);

	// start the tween
	tweenHead.start();
}

// ## Initialize everything
function init() {
	// test if webgl is supported
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	// create the camera
	camera = new THREE.Camera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 1000;

	// create the Scene
	scene = new THREE.Scene();

	// build the GUI 
	buildGui(userOpts, function(){
		console.log("userOpts", userOpts)
		setupTween();
	});

	// create the Cube
	cube = new THREE.Mesh( new THREE.CubeGeometry( 200, 200, 200 ), new THREE.MeshNormalMaterial() );

	setupTween();

(function(){
	return;
	var mesh	= cube;
	var update	= function(){
		mesh.position.x = position.x;
	}

	var position	= {x: 450};
	var tween = new TWEEN.Tween(position)
		.to({x: -450}, 3000)
		.delay(1000)
		.easing(TWEEN.Easing.Elastic.EaseInOut)
		.onUpdate(update);

	var tweenBack = new TWEEN.Tween(position)
		.to({x: 450}, 2000)
		.delay(1000)
		.easing(TWEEN.Easing.Elastic.EaseInOut)
		.onUpdate(update);

	tween.chain(tweenBack);
	tweenBack.chain(tween);
	
	tween.start();
})();

	// add the object to the scene
	scene.addObject( cube );

	// create the container element
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	// init the WebGL renderer and append it to the Dom
	renderer = new THREE.WebGLRenderer();
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
	// update the tweens from TWEEN library
	TWEEN.update();
}


// ## Render the 3D Scene
function render() {
	var dtime	= Date.now()/1000;
	// animate the cube
	if( false ){
		cube.rotation.x += 0.02;
		cube.rotation.y += 0.0225;
		cube.rotation.z += 0.0175;		
	}
	// make the cube bounce
	if( false ){
		var scale	= 1.0 + 0.3*Math.sin(dtime*Math.PI);
		cube.scale.set(scale, scale, scale);		
	}
	// actually display the scene in the Dom element
	renderer.render( scene, camera );
}
