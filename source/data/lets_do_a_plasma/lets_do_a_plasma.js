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
	camera	= new THREE.Camera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z	= 80;
	camera.position.z	= 200;

	// create the Scene
	scene	= new THREE.Scene();


	var dirLight	= new THREE.DirectionalLight( 0xffffff, 0.8 );
	dirLight.position.set( 0, 0, 1 );
	dirLight.position.normalize();
	scene.addLight( dirLight );
	
	
	var pointLight	= new THREE.PointLight( 0x8080f0, 5.5 );
	pointLight.position.set( 0, 100, 50 );
	scene.addLight( pointLight );


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
	//var material	= new THREE.MeshShaderMaterial({
	//	vertexShader	: THREEx.ShaderLib['cel'].vertexShader,
	//	fragmentShader	: THREEx.ShaderLib['cel'].fragmentShader,
	//	uniforms	: THREEx.UniformsLib['cel']
	//});

	//var material	= new THREE.MeshNormalMaterial();
	var material	= new THREE.MeshPhongMaterial( { color: 0xA02000 } );

	var geometry	= new THREE.CubeGeometry( 100, 100, 100 );
	var geometry	= new THREE.TorusGeometry( 50, 20, 45, 45 );
	//var geometry	= new THREE.SphereGeometry( 100, 25, 25 );


	//var geometry	= new THREE.TextGeometry("knock out", {
	//	size		: 50,
	//	height		: 30,
	//	weight		: 'bold',
	//	bezelThickness	: 10,
	//	bezelSize	: 10,
	//	bezelEnabled	: true
	//});

	THREEx.GeometryWobble.init(geometry);
	THREEx.GeometryWobble.cpuAxis(geometry, 'x', 0.02);
	
	//material	= [material, new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } )]; 
	
// TODO make a plan facing camera instead
	// create the Mesh
	planeMesh	= new THREE.Mesh( geometry, material );

	// to center the object
	//planeMesh.geometry.computeBoundingBox();
	//planeMesh.position.x	= -0.5 * ( planeMesh.geometry.boundingBox.x[ 1 ] - planeMesh.geometry.boundingBox.x[ 0 ] );
	//planeMesh.position.y	= -0.5 * ( planeMesh.geometry.boundingBox.y[ 1 ] - planeMesh.geometry.boundingBox.y[ 0 ] );
	//planeMesh.position.z	= -0.5 * ( planeMesh.geometry.boundingBox.z[ 1 ] - planeMesh.geometry.boundingBox.z&[ 0 ] );
	
	// add the object to the scene
	scene.addObject( planeMesh );


// failed attempts at a generic geometryCenter()
(function(geometry){
	return;
	//geometry.computeBoundingBox();

	var delta	= new THREE.Vector3()
	delta.x		= -( geometry.boundingBox.x[ 1 ] - geometry.boundingBox.x[ 0 ] ) / 2;
	delta.y		= -( geometry.boundingBox.y[ 1 ] - geometry.boundingBox.y[ 0 ] ) / 2;
	delta.z		= -( geometry.boundingBox.z[ 1 ] - geometry.boundingBox.z[ 0 ] ) / 2;
console.log("delta", delta)
console.log("boundingBox", geometry.boundingBox)
	for(var i = 0; i < geometry.vertices.length; i++) {
		var vertex	= geometry.vertices[i];
		vertex.position.addSelf( delta )
	}
//geometry.computeBoundingBox();
console.log("boundingBox", geometry.boundingBox)
//geometry.computeCentroids();
//geometry.computeFaceNormals();
//geometry.computeVertexNormals();
	geometry.__dirtyVertices = true;
})(planeMesh.geometry);

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

/**
 * @param {Object} uniforms the uniforms of the shader
*/
function animatePlasma(uniforms)
{
	var time	= Date.now()/1000;
	uniforms.time.value	= time * userOpts.speed;	
	uniforms.rotation.value	= Math.sin(time/10)*Math.PI;
	uniforms.scale.value	= 0.4 - 0.2*Math.sin(time);

	uniforms.c0.value	= userOpts.c0;	
	uniforms.c1.value	= userOpts.c1;	
	uniforms.c2.value	= userOpts.c2;	
	uniforms.c3.value	= userOpts.c3;	
	uniforms.c4.value	= userOpts.c4;	
	uniforms.c5.value	= userOpts.c5;	
}

// ## Render the 3D Scene
function render(){
	// to animate the plasme
	//animatePlasma(planeMesh.materials[0].uniforms);
	
	var time	= Date.now()/1000;

	// to animate the geometry
	THREEx.GeometryWobble.Animate(planeMesh.geometry, time*3, 20);
	
	// animate the planeMesh
	if( false ){
		//planeMesh.rotation.x += 0.02;
		planeMesh.rotation.y += 0.0225;
		//planeMesh.rotation.z += 0.0175;
	}
	// make the planeMesh bounce
	if( false ){
		var dtime	= Date.now() - startTime;
		planeMesh.scale.x	= 1.0 + 0.3*Math.sin(dtime/300);
		planeMesh.scale.y	= 1.0 + 0.3*Math.sin(dtime/300);
		planeMesh.scale.z	= 1.0 + 0.3*Math.sin(dtime/300);		
	}
	// actually display the scene in the Dom element
	renderer.render( scene, camera );
}
