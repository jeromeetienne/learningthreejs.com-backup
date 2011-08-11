var SEPARATION	= 100;
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
		message	: 'slota',
		maxSize	: 5
	};
	
	var gui = new DAT.GUI({
		height	: 2 * 26 + 11
	});
	
	// Text field
	gui.add(parameters, 'message');
	
	// Sliders with min + max
	gui.add(parameters, 'maxSize').min(0.5).max(7);
}

function init()
{
	buildGui();

	// create the container
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	// create the Camera
	camera = new THREE.Camera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 1000;
	// build the scene
	scene = new THREE.Scene();

	// not sure what is it
	// maybe the way each particule are drawn 
	var material = new THREE.ParticleCanvasMaterial( {
		color: 0xffffff,
		program: function ( context ) {
			context.beginPath();
			context.arc( 0, 0, 1, 0, Math.PI * 2, true );
			context.closePath();
			context.fill();
		}
	} );

	// create the particules
	//for ( var ix = 0; ix < AMOUNTX; ix++ ) {
	//
	//	for ( var iy = 0; iy < AMOUNTY; iy++ ) {
	//
	//		particle = new THREE.Particle( material );
	//		particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
	//		particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
	//		scene.addObject( particle );
	//	}
	//}


	// create all the particules objects and add them to the scene
	var particules	= [];
	for ( var ix = 0; ix < AMOUNTX; ix++ ) {
		for ( var iy = 0; iy < AMOUNTY; iy++ ) {
			particle = new THREE.Particle( material );
			scene.addObject( particle );
			particules[ix*AMOUNTY+iy]	= particle;
		}
	}
	for ( var ix = 0; ix < AMOUNTX; ix++ ) {
		for ( var iy = 0; iy < AMOUNTY; iy++ ) {
			particle	= particules[ix*AMOUNTY+iy];
			particle.position.x = ix * SEPARATION - ( ( AMOUNTX * SEPARATION ) / 2 );
			particle.position.z = iy * SEPARATION - ( ( AMOUNTY * SEPARATION ) / 2 );
		}
	}

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
