// This source is the javascript needed to build a simple moving
// mesh in **three.js** based on this
// [example](https://raw.github.com/mrdoob/three.js/master/examples/canvas_geometry_mesh.html)
// It is the source about this [blog post](/blog/2011/08/06/lets-do-a-cube/).

// ## Now lets start

// declare a bunch of variable we will need later
var startTime	= Date.now();
var container;
var camera, scene, renderer, stats;
var mesh;

// maybe replace that by window... or something
var userOpts	= {
	speed		: 4.0,
	c0		: 5.0,
	c1		: 3.0,
	c2		: 6.0,
	c3		: 7.0,
	c4		: 5.0,
	c5		: 3.0
};

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
	camera	= new THREE.Camera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z	= 80;
	camera.position.z	= 120;

	// create the Scene
	scene	= new THREE.Scene();


	var dirLight	= new THREE.DirectionalLight( 0x20a080, 1.0 );
	dirLight.position.set( 0, 0, 1 );
	dirLight.position.normalize();
	scene.addLight( dirLight );
	
	
	var pointLight	= new THREE.PointLight( 0x0101f0, 3.5 );
	pointLight.position.set( 50, 50, 50 );
	scene.addLight( pointLight );

	var pointLight	= new THREE.PointLight( 0xF00180, 5 );
	pointLight.position.set( -50, 0, 10 );
	scene.addLight( pointLight );

	//var material	= new THREE.MeshNormalMaterial();
	var material	= new THREE.MeshPhongMaterial( { color: 0xaaaaaa } );

	var geometry	= new THREE.CubeGeometry( 100, 100, 100 );
	//var geometry	= new THREE.TorusGeometry( 50, 20, 45, 45 );
	var geometry	= new THREE.SphereGeometry( 50, 25, 25 );


	//var geometry	= new THREE.TextGeometry("node.js", {
	//	size		: 50,
	//	height		: 20,
	//	weight		: 'bold',
	//	bezelThickness	: 10,
	//	bezelSize	: 10,
	//	bezelEnabled	: true
	//});
	THREEx.GeometryCenter.center(geometry);

	THREEx.GeometryWobble.init(geometry);
	THREEx.GeometryWobble.cpuAxis(geometry, 'x', 0.02);
	
	// add wireframe
	material	= [material, new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } )]; 
	
// TODO make a plan facing camera instead
	// create the Mesh
	mesh	= new THREE.Mesh( geometry, material );

	// to center the object
	//mesh.geometry.computeBoundingBox();
	//mesh.position.x	= -0.5 * ( mesh.geometry.boundingBox.x[ 1 ] - mesh.geometry.boundingBox.x[ 0 ] );
	//mesh.position.y	= -0.5 * ( mesh.geometry.boundingBox.y[ 1 ] - mesh.geometry.boundingBox.y[ 0 ] );
	//mesh.position.z	= -0.5 * ( mesh.geometry.boundingBox.z[ 1 ] - mesh.geometry.boundingBox.z[ 0 ] );
	
	// add the object to the scene
	scene.addObject( mesh );

	// create the container element
	container	= document.createElement( 'div' );
	document.body.appendChild( container );

	// init the WebGL renderer and append it to the Dom
	renderer	= new THREE.WebGLRenderer({
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
function render(){
	var time	= Date.now()/1000;

	// to animate the geometry
	THREEx.GeometryWobble.Animate(mesh.geometry, time/Math.PI*15, new THREE.Vector3(15,25, 00));
	
	// animate the mesh
	if( true ){
		mesh.rotation.x += 0.005/2.5;
		mesh.rotation.y += 0.0125/2.5;
		mesh.rotation.z += 0.0085/2.5;
	}
	// make the mesh bounce
	if( true ){
		var dtime	= Date.now() - startTime;
		mesh.scale.x	= 1.0 + 0.3*Math.sin(dtime/300);
		mesh.scale.y	= 1.0 + 0.3*Math.sin(dtime/300);
		mesh.scale.z	= 1.0 + 0.3*Math.sin(dtime/300);		
	}
	// actually display the scene in the Dom element
	renderer.render( scene, camera );
}
