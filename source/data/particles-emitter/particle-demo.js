var container, stats, containerObj;
var camera, scene, renderer, particle;
var sprite;
var mouseX = 0, mouseY = 0;
var particleSys;

// detect if webgl is needed and available
if( !Detector.webgl ){
	Detector.addGetWebGLMessage();
}else{
	init();
	animate();	
}

function init()
{
	// create the container
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	// create the Camera
	camera = new THREE.Camera(30, window.innerWidth / window.innerHeight, 1, 100000 );
	camera.position.z = 400;
	
	// build the scene
	scene = new THREE.Scene();

	// define the containerObj of all the particle
	containerObj	= new THREE.Object3D();
	scene.addChild(containerObj)


if(false){
	var geometry	= new THREE.Geometry();
	geometry.colors = [];			
	var material	= new THREE.ParticleBasicMaterial({
		//map		: THREE.ImageUtils.loadTexture( "images/lensFlare/Flare1.png" ),
		map		: THREE.ImageUtils.loadTexture( "images/ball.png" ),
		vertexColors	: true,
		size		: 16,
		
		blending	: THREE.AdditiveBlending,
		transparent	: true
	});
	material.color.setRGB( 0.2, 1.0, 0.7 );
	particleSys	= new THREE.ParticleSystem( geometry, material );
	particleSys.sortParticles = true;
	//particleSys.dynamic = true;
	containerObj.addChild( particleSys );

	for(var i = 0; i < 10000; i++){
		var v3	= new THREE.Vector3( 0,0,0 );
		v3.x	= Math.random()*2-1;
		v3.y	= Math.random()*2-1;
		v3.z	= Math.random()*2-1;
		v3.multiplyScalar(300)
		geometry.vertices.push( new THREE.Vertex( v3 ) );
		
		geometry.colors.push( new THREE.Color( 0xffffff ) );
	}

	particleSys.geometry.__dirtyVertices = true;
	particleSys.updateMatrix();
}

	Emitter	= new THREEx.Particle.Emitter();
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
		camera.position.x += ( mouseX - camera.position.x ) * .05;
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
