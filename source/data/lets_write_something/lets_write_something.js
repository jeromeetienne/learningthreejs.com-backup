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
var projector;

var mouse = { x: 0, y: 0 }

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
	camera.position.y	= 50;
	camera.position.z	= 500;
	camera.target.position.y= 50;

	// create the Scene
	scene		= new THREE.Scene();

	projector = new THREE.Projector();
	
	scene.fog	= new THREE.Fog( 0xf0f0f0, 250, 1000 );

	var dirLight	= new THREE.DirectionalLight( 0xffffff, 0.8 );
	dirLight.position.set( 0, 0, 1 );
	dirLight.position.normalize();
	scene.addLight( dirLight );
	
	
	var pointLight	= new THREE.PointLight( 0x8080f0, 1.5 );
	pointLight.position.set( 0, 100, 50 );
	scene.addLight( pointLight );


	//var textGeo	= new THREE.TextGeometry( "Hello");
	//var textMaterial= new THREE.MeshNormalMaterial();
	//var textMesh1	= new THREE.Mesh( textGeo, textMaterial );
	//scene.addChild( textMesh1 );

	var geometry	= new THREE.TextGeometry("Large-scale Amazon EC2 Outage", {
		size	: 30,
		height	: 10
	});

	//mesh	= new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
	mesh	= new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: 0xff0000 } ) );

	mesh.rotation.y	= 40*Math.PI/180;
	scene.addChild( mesh );
	
	THREE.Collisions.colliders.push( THREE.CollisionUtils.MeshOBB( mesh ) );	

if(false){
	var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20feed%20where%20url%3D'http%3A%2F%2Fnews.ycombinator.com%2Frss'&format=json&diagnostics=false&callback=?";
	jQuery.getJSON(url, function(json){
		var items	= json.query.results.item;
		var item	= items[0]
		console.log("data", json)


		var title	= item.title;
		var comments	= item.comments;
		var link	= item.link;

		var geometry	= new THREE.TextGeometry(item.title, {
			size	: 20
		});

		var mesh	= new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
		scene.addChild( mesh );
	});	
}

	// create the container element
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	
	container.onmousemove	= onDocumentMouseMove;
	container.onclick	= onDocumentClick;

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

function onDocumentMouseMove( event ){
	event.preventDefault();
	mouse.x	= ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y	= - ( event.clientY / window.innerHeight ) * 2 + 1;
};

function onDocumentClick( event ){
	event.preventDefault();
	var mouseX	= (event.clientX / window.innerWidth) * 2 - 1;
	var mouseY	= -(event.clientY / window.innerHeight) * 2 + 1;

	var vector = new THREE.Vector3( mouseX, mouseY, 0.5 );
	projector.unprojectVector( vector, camera );

	var ray = new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );

	var c = THREE.Collisions.rayCastNearest( ray );

	if ( c ) {
		console.log("collide")
		window.open('http://jetienne.com','_newtab');
	} else {
		console.log("not collide")
	}	
	
};

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

	
	// animate the mesh
	//mesh.rotation.x += 0.02;
	//mesh.rotation.y += 0.0125;
	//mesh.rotation.z += 0.0175;

	// actually display the scene in the Dom element
	renderer.render( scene, camera );
}


