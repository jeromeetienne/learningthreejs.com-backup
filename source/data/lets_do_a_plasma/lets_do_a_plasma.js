// This source is the javascript needed to build a simple moving
// planeMesh in **three.js** based on this
// [example](https://raw.github.com/mrdoob/three.js/master/examples/canvas_geometry_planeMesh.html)
// It is the source about this [blog post](/blog/2011/08/06/lets-do-a-cube/).

// ## Now lets start

// declare a bunch of variable we will need later
var startTime	= Date.now();
var container;
var camera, scene, renderer, stats;
var planeMesh;

// maybe replace that by window... or something
var userOpts	= {
	speed		:  4.0,
	c0		:  5.0,
	c1		:  3.0,
	c2		: 11.0,
	c3		:  7.0,
	c4		:  9.0,
	c5		:  3.0
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
		height	: 7 * 32 - 1
	});

	gui.add(options, 'speed').min(0).max(10)
		.onFinishChange(function(){callback(options)}).onChange(function(){callback(options)});
	gui.add(options, 'c0').min(0.1).max(8)
		.onFinishChange(function(){callback(options)}).onChange(function(){callback(options)});
	gui.add(options, 'c1').min(0.1).max(8)
		.onFinishChange(function(){callback(options)}).onChange(function(){callback(options)});
	gui.add(options, 'c2').min(0.1).max(8)
		.onFinishChange(function(){callback(options)}).onChange(function(){callback(options)});
	gui.add(options, 'c3').min(0.1).max(8)
		.onFinishChange(function(){callback(options)}).onChange(function(){callback(options)});
	gui.add(options, 'c4').min(0.1).max(8)
		.onFinishChange(function(){callback(options)}).onChange(function(){callback(options)});
	gui.add(options, 'c5').min(0.1).max(8)
		.onFinishChange(function(){callback(options)}).onChange(function(){callback(options)});
}


// ## Initialize everything
function init() {
	// test if webgl is supported
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	// create the camera
	camera = new THREE.Camera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 100;
	camera.position.z = 200;

	// create the Scene
	scene = new THREE.Scene();


	// build the GUI 
	buildGui(userOpts, function(){
		//console.log("userOpts", JSON.stringify(userOpts, null, '\t'))
	});
	
	// create the material
	var material	= new THREE.MeshShaderMaterial({
		vertexShader	: THREEx.ShaderLib['plasma'].vertexShader,
		fragmentShader	: THREEx.ShaderLib['plasma'].fragmentShader,
		uniforms	: THREEx.UniformsLib['plasma']
	});
/**
 * How to make shader easier to use ?
 * - need a js object on top ?
 * - well isnt that Material ? like PlasmaMaterial ?
 * - then make it super flexible.
 * - port the other from adrien boeing ? attribute credits
*/
	

// TODO make a plan facing camera instead
	// create the Mesh
	planeMesh = new THREE.Mesh( new THREE.PlaneGeometry( 400, 300 ), material );
	planeMesh = new THREE.Mesh( new THREE.SphereGeometry( 100, 48, 32 ), material );
	planeMesh = new THREE.Mesh( new THREE.CubeGeometry( 100, 100, 100 ), material );
	

	// add the object to the scene
	scene.addObject( planeMesh );

	// create the container element
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	// init the WebGL renderer and append it to the Dom
	renderer = new THREE.WebGLRenderer({
		antialias		: true,
		preserveDrawingBuffer	: true
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
(function(){
	var time	= (Date.now() - startTime)/1000;
	var uniforms	= planeMesh.materials[0].uniforms;
	uniforms.time.value	= time*userOpts.speed;	
	uniforms.c0.value	= userOpts.c0;	
	uniforms.c1.value	= userOpts.c1;	
	uniforms.c2.value	= userOpts.c2;	
	uniforms.c3.value	= userOpts.c3;	
	uniforms.c4.value	= userOpts.c4;	
	uniforms.c5.value	= userOpts.c5;	
})();

	// animate the planeMesh
	if( true ){
		planeMesh.rotation.x += 0.02;
		planeMesh.rotation.y += 0.0225;
		planeMesh.rotation.z += 0.0175;
	}
	// make the planeMesh bounce
	if( true ){
		var dtime	= Date.now() - startTime;
		planeMesh.scale.x	= 1.0 + 0.3*Math.sin(dtime/300);
		planeMesh.scale.y	= 1.0 + 0.3*Math.sin(dtime/300);
		planeMesh.scale.z	= 1.0 + 0.3*Math.sin(dtime/300);		
	}
	// actually display the scene in the Dom element
	renderer.render( scene, camera );
}
