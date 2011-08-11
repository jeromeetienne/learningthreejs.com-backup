var AMOUNTX	= 50;
var AMOUNTY	= 50;

var container, stats;
var camera, scene, renderer, particle;
var mouseX = 0, mouseY = 0;

//var windowHalfX = window.innerWidth / 2;
//var windowHalfY = window.innerHeight / 2;

init();
animate();

/**
 * Build ui with Data.GUI
*/
function buildGui()
{
	// maybe replace that by window... or something
	var parameters = {
		iterations	: 10000,
		interval	: 0.0005,
		a		: 5,
		b		: 15,
		c		: 1,
		update		: function(){
			alert('update')
		}
	};
	
	var gui = new DAT.GUI({
		height	: 6 * 32 - 1
	});
	

	gui.add(parameters, 'iterations').name('Iterations').min(10000).max(500000).step(1);
	gui.add(parameters, 'interval').name('Interval').min(0.001).max(0.01);
	gui.add(parameters, 'a').name('Sigma').min(1).max(30).step(1);
	gui.add(parameters, 'b').name('Rho').min(1).max(100).step(1);
	gui.add(parameters, 'c').name('Beta').min(0.01).max(3);
	gui.add(parameters, 'update').name('Go!');
}

function cpuDotFloor(particules)
{
	var SEPARATION	= 100;
	for ( var ix = 0; ix < AMOUNTX; ix++ ) {
		for ( var iy = 0; iy < AMOUNTY; iy++ ) {
			var particle	= particules[ix*AMOUNTY+iy];
			particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
			particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
		}
	}	
}

function cpuDotLorentz(particules, opts)
{
	var x	= 0.1;
	var y	= 0.1;
	var z	= 0.1;

	var a	= 5;
	var b	= 15;
	var c	= 1;
	var interval     = 0.0050;
	
	
	console.assert( 'a' in opts )
	console.assert( 'b' in opts )
	console.assert( 'c' in opts )
	console.assert( 'intervals' in opts )
	
	a	= opts.a;
	b	= opts.b;
	c	= opts.c;
	interval= opts.interval;

	for(var i = 0; i < particules.length; i++){
		// compute lorentz
		var newX	= x - (a * x) * interval + (a * y) * interval;
		var newY	= y + (b * x) * interval - y * interval - (z * x) * interval;
		var newZ	= z - (c * z) * interval + (x * y) * interval;
		x	= newX;
		y	= newY;
		z	= newZ;

		var particle	= particules[i];
		particle.position.x = x*7;
		particle.position.y = y*7;
		particle.position.z = z*7;
	}
}

function init()
{
	buildGui();

	// create the container
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	// create the Camera
	camera = new THREE.Camera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 200;
	// build the scene
	scene = new THREE.Scene();

	// not sure what is it
	// maybe the way each particule are drawn 
	var material = new THREE.ParticleCanvasMaterial( {
		color	: 0xffffff,
		program	: function (context, color) {
			context.beginPath();
			context.arc( 0, 0, 0.5, 0, Math.PI * 2, true );
			context.closePath();
			context.fill();
		}
	} );

	// create all the particules objects and add them to the scene
	var nbParticules= AMOUNTX * AMOUNTY;
	var particules	= new Array(nbParticules);
	for(var i = 0; i < nbParticules; i++){
		var particle = new THREE.Particle( material );
		//particle.materials[0].color.setRGB(iy/AMOUNTX, 0, 0)
		scene.addObject( particle );
		particules[i]	= particle;
	}
	// compute the position of the particules
	//cpuDotFloor(particules)
	cpuDotLorentz(particules)

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
	camera.position.x += ( mouseX - camera.position.x ) * .05;
	camera.position.y += ( - mouseY - camera.position.y ) * .05;
	// actually render the scene
	renderer.render( scene, camera );
}
