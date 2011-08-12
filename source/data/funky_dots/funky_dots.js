var AMOUNTX	= 50;
var AMOUNTY	= 50;

var container, stats, parent;
var camera, scene, renderer, particle;
var mouseX = 0, mouseY = 0;


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

	gui.add(parameters, 'iterations').name('Iterations').min(10000).max(500000).step(1)
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

function cpuDotLorentz(particules, opts)
{

	
	// sanity check
	console.assert( 'a' in opts )
	console.assert( 'b' in opts )
	console.assert( 'c' in opts )
	console.assert( 'interval' in opts )
	
	a	= opts.a;
	b	= opts.b;
	c	= opts.c;
	interval= opts.interval;

	// initial value
	var x	= 0.1;
	var y	= 0.1;
	var z	= 0.1;
	var scale	= 8;
	// go thru each particule
	for(var i = 0; i < particules.length; i++){
		var particle	= particules[i];
		// compute lorentz delata
		var dx	= (y - x) * a;
		var dy	= (b - z) * x - y;
		var dz	= x*y - c*z;
		// goto next coord
		x	+= dx * interval;
		y	+= dy * interval;
		z	+= dz * interval;
		// get the coord for this particule
		particle.position.x = x*scale;
		particle.position.y = y*scale;
		particle.position.z = (z-b)*scale;
	}
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
	// go thru each particule
	for(var i = 0; i < particules.length; i++){
		var particle	= particules[i];
		particle.materials[0].color.setHSV(f(i/130)*0.5+0.5, 0.5, f(i/50)*0.7+0.3)
	}
}

function init()
{
	// maybe replace that by window... or something
	var parameters = {
		iterations	: 10000,
		interval	: 0.02,
		a		: 5,
		b		: 15,
		c		: 1
	};
	
	buildGui(parameters, function(){
		console.log("parameters", JSON.stringify(parameters, null, '\t'))
		cpuDotLorentz(particules, parameters);
	});

	// create the container
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	// create the Camera
	camera = new THREE.Camera(30, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 300;
	
	// build the scene
	scene = new THREE.Scene();

	// not sure what is it
	// maybe the way each particule are drawn
	var particleDraw	= function(context, color){
		context.beginPath();
		context.arc( 0, 0, 0.5, 0, Math.PI * 2, true );
		context.closePath();
		context.fill();		
	}

	// define the parent of all the particule
	parent	= new THREE.Object3D();
	scene.addChild(parent)
	
	// create all the particules objects and add them to the scene
	var nbParticules= AMOUNTX * AMOUNTY;
	var particules	= new Array(nbParticules);
	for(var i = 0; i < nbParticules; i++){
		var particle = new THREE.Particle( new THREE.ParticleCanvasMaterial( {
			color	: Math.random() * 0x808080 + 0x808080,
			program	: particleDraw
		} ) );
		parent.addChild( particle );
		particules[i]	= particle;
	}
	// compute the position of the particules
	cpuDotLorentz(particules, parameters);

	// init the renderer
	renderer	= new THREE.CanvasRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	// init the Stats
	stats	= new Stats();
	stats.domElement.style.position	= 'absolute';
	stats.domElement.style.top	= '0px';
	container.appendChild( stats.domElement );

	// listen to mousemove to animate the scene
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
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
	//camera.position.x += ( mouseX - camera.position.x ) * .05;
	//camera.position.y += ( - mouseY - camera.position.y ) * .05;
	// animate the cube
	parent.rotation.x += 0.02;
	parent.rotation.y += 0.0225;
	parent.rotation.z += 0.0175;
	// actually render the scene
	renderer.render( scene, camera );
}
