var container, stats, containerObj;
var camera, scene, renderer;
var mouseX = 0, mouseY = 0;
var particleSys;

// detect if webgl is needed and available
if( !Detector.webgl ){
	Detector.addGetWebGLMessage();
}else{
	init();
	animate();	
}

/**
 * Build ui with Data.GUI
*/
function buildGui(parameters, callback)
{
	var gui = new DAT.GUI({
		height	: 7 * 32 - 1
	});
	var change	= function(){
		callback(parameters)
	};

	gui.add(parameters, 'timeToLive').min(200).max(5*1000)
		.onFinishChange(change);

	gui.add(parameters, 'opacitySrc').min(0.0).max(1.0)
		.onFinishChange(change);
	gui.add(parameters, 'opacityInc').min(-0.05).max(0)
		.onFinishChange(change);

	gui.add(parameters, 'sizeSrc').min(2).max(32)
		.onFinishChange(change);
	gui.add(parameters, 'sizeInc').min(-1).max(1)
		.onFinishChange(change);

	gui.add(parameters, 'rotationSrc').min(0.0).max(2*Math.PI)
		.onFinishChange(change);
	gui.add(parameters, 'rotationInc').min(-0.05).max(0.05)
		.onFinishChange(change);
}

function init()
{
	// create the container
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	// create the Camera
	camera = new THREE.Camera(30, window.innerWidth / window.innerHeight, 1, 100000 );
	camera.position.z	= 400;
	
	// build the scene
	scene = new THREE.Scene();

	var parameters	= {
		timeToLive	: 2000,
		
		opacitySrc	: 1.0,
		opacityInc	: 0.0,
		
		sizeSrc		: 16.0,
		sizeInc		:  0.0,

		rotationSrc	:  0.0,
		rotationInc	:  0.0,
	};
	buildGui(parameters, function(){
		
	})

	// define the containerObj of all the particle
	containerObj	= new THREE.Object3D();
	scene.addChild(containerObj)

	Emitter	= new THREEx.Particle.Emitter({
		params	: parameters
	});
	containerObj.addChild( Emitter.object3d() );
	
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
	Emitter.update();
	render();
	stats.update();
}

function render()
{
	// move the camera
	if( true ){		
		camera.position.x += (   mouseX - camera.position.x ) * .05;
		camera.position.y += ( - mouseY - camera.position.y ) * .05;
	}
	// animate the cube
	if( false ){
		containerObj.rotation.x += 0.4*0.02;
		containerObj.rotation.y += 0.4*0.0225;
		containerObj.rotation.z += 0.4*0.0175;		
	}

	// actually render the scene
	renderer.render( scene, camera );
}
