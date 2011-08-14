var container, stats, containerObj;
var camera, scene, renderer, particle;
var sprite;
var mouseX = 0, mouseY = 0;
var useWebgl	= true;

init();
animate();

/**
 * Build ui with Data.GUI
*/
function buildGui(parameters, callback)
{
	var gui = new DAT.GUI({
		height	: 5 * 32 - 1
	});

	gui.add(parameters, 'iterations').name('Iterations').min(1000).max(8000).step(1)
		.onFinishChange(function(){callback(parameters)}).onChange(function(){callback(parameters)});
	gui.add(parameters, 'interval').name('Interval').min(0.001).max(0.1)
		.onFinishChange(function(){callback(parameters)}).onChange(function(){callback(parameters)});
	gui.add(parameters, 'a').name('Sigma').min(1).max(30)
		.onFinishChange(function(){callback(parameters)}).onChange(function(){callback(parameters)});
	gui.add(parameters, 'b').name('Rho').min(1).max(30)
		.onFinishChange(function(){callback(parameters)}).onChange(function(){callback(parameters)});
	gui.add(parameters, 'c').name('Beta').min(0.01).max(3)
		.onFinishChange(function(){callback(parameters)}).onChange(function(){callback(parameters)});
}

function buildObjectParticlesWebgl(particles, nParticles)
{
	console.assert(useWebgl, "to be used only with webgl renderer")
	if( nParticles < particles.length ){
		// remove particles if needed
		while( particles.length != nParticles ){
			// remove a particle from the particles
			var particle	= particles.pop();
			// detach it from the Object3D containerObj
			containerObj.removeChild(particle)
		}
	}else if( nParticles > particles.length ){
		// add particles if needed
		var toAdd	= nParticles - particles.length;
		var colors	= [];
		var geometry	= new THREE.Geometry();
		geometry.colors = colors;
/**
 * * issue on the addition removal
 *   * and because the estimatoin of the current number of dot is based on particles array
 *   * this array is not even used anymore
 * * this is because this is not the same function
 *   * vertices is an array, container is object3D 
 * * only does the webgl particles
 * * clean the source a lot
*/
		for(var i = 0; i < toAdd; i++){
			var x, y, z, s = 300;
			x = s * Math.random() - s/2;
			y = s * Math.random() - s/2;
			z = s * Math.random() - s/2;
			geometry.vertices.push( new THREE.Vertex( new THREE.Vector3( x, y, z ) ) );
		
			colors[ i ] = new THREE.Color( 0xffffff );
			//colors[ i ].setHSV( (x+s/2)/s, 1.0, 1.0 );
		}
		var material	= new THREE.ParticleBasicMaterial( { size: 8, map: sprite, vertexColors: true } );
		//material.color.setHSV( 1.0, 0.2, 0.8 );

		var particleSys	= new THREE.ParticleSystem( geometry, material );
		particleSys.sortParticles = true;
console.log("particleSys", particleSys)
		particleSys.updateMatrix();
		containerObj.addChild( particleSys );
	}
}

function cpuDotLorentz(particles, opts)
{
	// sanity check
	console.assert( 'iterations' in opts )
	console.assert( 'a' in opts )
	console.assert( 'b' in opts )
	console.assert( 'c' in opts )
	console.assert( 'interval' in opts )

	buildObjectParticlesWebgl(particles, opts.iterations)

console.log("containerObj", containerObj, containerObj.children[0].geometry);

	a	= opts.a;
	b	= opts.b;
	c	= opts.c;
	interval= opts.interval;

	// initial value
	var x	= 0.1;
	var y	= 0.1;
	var z	= 0.1;
	var scale	= 8;
	// go thru each particle
	for(var i = 0; i < opts.iterations; i++){
		// compute lorentz delata
		var dx	= (y - x) * a;
		var dy	= (b - z) * x - y;
		var dz	=  x*y - c*z;
		// goto next coord
		x	+= dx * interval;
		y	+= dy * interval;
		z	+= dz * interval;
		// get the coord for this particle
		var vertex	= containerObj.children[0].geometry.vertices[i];
 		vertex.position.x = x*scale;
		vertex.position.y = y*scale;
		vertex.position.z = (z-b)*scale;		
	}
return
	/**
	 * say value is between 0 and 1
	 * - if v < 0.5, then f(x) = x
	 * - if v >= 0.5, then f(x)= 1.0 - x
	*/
	var f = function(v){
		v	= v % 1.0;
		if( v < 0.5 )	return v*2;
		return (1.0 - v) * 2;
	}

	// go thru each particle
	for(var i = 0; i < particles.length; i++){
		var particle	= particles[i];
		particle.materials[0].color.setHSV(f(i/130)*0.5+0.5, 0.5, f(i/50)*0.7+0.3)
	}
}

function init()
{
	// detect if webgl is needed and available
	if( useWebgl && !Detector.webgl ) Detector.addGetWebGLMessage();
	
	// create the container
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	// create the Camera
	camera = new THREE.Camera(30, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 300;
	
	// build the scene
	scene = new THREE.Scene();

	// define the containerObj of all the particle
	containerObj	= new THREE.Object3D();
	scene.addChild(containerObj)

/**
 * Use blending to make the color cooler good with webgl
*/

	sprite = THREE.ImageUtils.loadTexture( "lensFlare/Flare2.png" );
	
	// maybe replace that by window... or something
	var parameters = {
		iterations	: 10000,
		interval	: 0.05,
		//iterations	: 2500,
		//interval	: 0.02,
		a		: 5,
		b		: 15,
		c		: 1
	};

	// create all the particles objects and add them to the scene
	var particles	= [];

	// compute the position of the particles
	cpuDotLorentz(particles, parameters);
	// build the GUI 
	buildGui(parameters, function(){
		console.log("parameters", JSON.stringify(parameters, null, '\t'))
		cpuDotLorentz(particles, parameters);
	});


	// init the renderer
	renderer	= new THREE.WebGLRenderer({
		antialias		: true,
		preserveDrawingBuffer	: true		
	});
	//renderer.sortObjects = true;
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	// init the Stats
	stats	= new Stats();
	stats.domElement.style.position	= 'absolute';
	stats.domElement.style.top	= '0px';
	container.appendChild( stats.domElement );

	// listen to mousemove to animate the scene
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

/**
 * Experimentation with toDataUrl on the 
*/
if(true){
	jQuery('body').click(function(){
		THREEx.Screenshot.resizeTo(THREEx.Screenshot.toDataURL(renderer), 320, 240, function(imgUrl, error){
			// put it on the DOM for debug
			//jQuery('<img>').attr('src', imgUrl).css({
			//	position:	'absolute',
			//	top:		'0px',
			//	right:		'0px'
			//}).appendTo('body');
			window.location = imgUrl;
			//window.open(imgUrl, '_target')
			//window.open(imgUrl, "super", "height=200, width=200");
		});
	});
}

/**
 * Experimentation with dropping image 
*/
if(false){
	document.addEventListener("drop", function(event){
		event.preventDefault();
		console.log("DROPPED", event.dataTransfer.files.length)
		for(var i = 0;i < event.dataTransfer.files.length; i ++){
			var file	= event.dataTransfer.files[i];
			//console.log("file", file)
			reader = new FileReader();
			reader.onload = function (event) {
				var imgUrl	= event.target.result;
				// put it on the DOM for debug
				jQuery('<img>').attr('src', imgUrl).css({
					position:	'absolute',
					top:		'0px',
					right:		'0px'
				}).appendTo('body')
				//window.open(imgUrl, "super", "height=200, width=200");
			};
			reader.readAsDataURL(file);
		}
	}, true);
	// no idea why this one is needed
	// - without it the image replace the current page
	document.addEventListener("dragover", function(event) {
		event.preventDefault();
	}, true);
}

}

//

function onDocumentMouseMove(event)
{
	mouseX = event.clientX - window.innerWidth / 2;
	mouseY = event.clientY - window.innerHeight / 2;
}


//
function animate() {
	requestAnimationFrame( animate );
	render();
	stats.update();
}

function render()
{
	// move the camera
	camera.position.x += ( mouseX - camera.position.x ) * .05;
	camera.position.y += ( - mouseY - camera.position.y ) * .05;
	// animate the cube
	//containerObj.rotation.x += 0.02;
	//containerObj.rotation.y += 0.0225;
	//containerObj.rotation.z += 0.0175;
	// actually render the scene
	renderer.render( scene, camera );
}
