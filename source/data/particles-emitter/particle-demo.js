var container, stats, containerObj;
var camera, scene, renderer;
var mouseX = 0, mouseY = 0;

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
	urlCacheInit	= function(opts){
		if( !window.location.hash )	return
		var hashStr	= window.location.hash.substring(1);
		var urlParams	= JSON.parse(decodeURIComponent(hashStr));
		Object.keys(urlParams).forEach(function(key){
			parameters[key]	= urlParams[key];
		}.bind(this));
	}
	urlCacheUpdate	= function(opts){
		var urlParams	= {};
		if( window.location.hash ){
			urlParams	= JSON.parse(decodeURIComponent(location.hash.substring(1)));
		}

		Object.keys(opts).forEach(function(key){
			urlParams[key]	= opts[key];
		}.bind(this));

		window.location.hash	= '#'+encodeURIComponent(JSON.stringify(urlParams));
	}

// Notice this belongs to the DAT.GUI class (uppercase)
// and not an instance thereof.
DAT.GUI.autoPlace = false;

	var change	= function(){
		// get parameters values from cache if needed
		//urlCacheUpdate(parameters)
		callback && callback(parameters)
	};
	
	// get parameters values from cache if needed
	//urlCacheInit(parameters)
	// init the cache with current parameters values
	//urlCacheUpdate(parameters)
	
	var gui1 = new DAT.GUI({
		height	: 17 * 32 - 1
	});
	gui1.domElement.style.position	= 'absolute';
	gui1.domElement.style.top	= '0px';
	gui1.domElement.style.right	= '0px';
	gui1.domElement.style['z-index']= '9999';
	document.body.appendChild(gui1.domElement);	
	
	gui1.add(parameters, 'emitRate').min(1).max(100)		.onFinishChange(change);
	gui1.add(parameters, 'timeToLive').min(200).max(5*1000)		.onFinishChange(change);

	gui1.add(parameters, 'originZaValue').min(-Math.PI).max(Math.PI)	.onFinishChange(change);
	gui1.add(parameters, 'originZaRange').min(-Math.PI).max(Math.PI)	.onFinishChange(change);

	gui1.add(parameters, 'originZhValue').min(0).max(100)		.onFinishChange(change);
	gui1.add(parameters, 'originZhRange').min(0).max(30)		.onFinishChange(change);

	gui1.add(parameters, 'originRadiusValue').min(0).max(100)	.onFinishChange(change);
	gui1.add(parameters, 'originRadiusRange').min(0).max(30)	.onFinishChange(change);

	gui1.add(parameters, 'speedValue').min(0.2).max(2)		.onFinishChange(change);
	gui1.add(parameters, 'speedRange').min(0).max(2)		.onFinishChange(change);

	gui1.add(parameters, 'gravity').min(0).max(0.2)			.onFinishChange(change);

	gui1.add(parameters, 'opacitySrc').min(0.0).max(1.0)		.onFinishChange(change);
	gui1.add(parameters, 'opacityInc').min(-0.05).max(0)		.onFinishChange(change);

	gui1.add(parameters, 'sizeSrc').min(2).max(128)			.onFinishChange(change);
	gui1.add(parameters, 'sizeInc').min(-1).max(1)			.onFinishChange(change);

	gui1.add(parameters, 'rotationSrc').min(0.0).max(2*Math.PI)	.onFinishChange(change);
	gui1.add(parameters, 'rotationInc').min(-0.05).max(0.05)	.onFinishChange(change);
		

(function(){
	var gui2	= new DAT.GUI({
		height	: 7 * 32 - 1
	});
	gui2.domElement.style.position	= 'absolute';
	gui2.domElement.style.top	= '0px';
	gui2.domElement.style.left	= '0px';
	gui1.domElement.style['z-index']= '9999';
	document.body.appendChild(gui2.domElement);	

	
	var tmpParams	= {
		colorR		: parameters.color.r,
		colorG		: parameters.color.g,
		colorB		: parameters.color.b,
		colorIncR	: parameters.colorInc.r,
		colorIncG	: parameters.colorInc.g,
		colorIncB	: parameters.colorInc.b
	};

	var changeColor	= function(){
		parameters.color.setRGB(tmpParams.colorR,tmpParams.colorG,tmpParams.colorB)
		parameters.colorInc.setRGB(tmpParams.colorIncR,tmpParams.colorIncG,tmpParams.colorIncB)
	}

	gui2.add(tmpParams, 'colorR')		.min(0.0).max(1.0).onChange(changeColor);
	gui2.add(tmpParams, 'colorG')		.min(0.0).max(1.0).onChange(changeColor);
	gui2.add(tmpParams, 'colorB')		.min(0.0).max(1.0).onChange(changeColor);
	gui2.add(tmpParams, 'colorIncR')	.min(-1.0).max(1.0).onChange(changeColor);
	gui2.add(tmpParams, 'colorIncG')	.min(-1.0).max(1.0).onChange(changeColor);
	gui2.add(tmpParams, 'colorIncB')	.min(-1.0).max(1.0).onChange(changeColor);
	

	gui2.add(parameters, 'textureUrl').options({
		"flare"			: "images/lensFlare/Flare1.png",
		"ball"			: "images/ball.png",
		"shine"			: "images/lensFlare/Shine1.png",
		"continous_smoke"	: "images/osg-data/continous_smoke.png",
		"smoke"			: "images/osg-data/smoke.png",
		"reflect"		: "images/osg-data/reflect.png"
	}).onChange(function(){
		console.log("texture change", containerObj)

		scene.removeChild(containerObj);
		containerObj	= new THREE.Object3D();
		scene.addChild(containerObj);
		
		// define the containerObj of all the particle
		Emitter	= new THREEx.Particle.Emitter(parameters);
		containerObj.addChild( Emitter.container() );

		
	});
		
}());	

}

function init()
{
	// create the container
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	// init the renderer
	renderer	= new THREE.WebGLRenderer({
		antialias		: true,
		preserveDrawingBuffer	: true		
	});
	//renderer.sortObjects = true;
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	// create the Camera
	if( false ){
		camera = new THREE.Camera(30, window.innerWidth / window.innerHeight, 1, 100000 );
		camera.position.z	= 400;		
	}else{
		camera = new THREE.TrackballCamera({
			fov: 25,
			aspect: window.innerWidth / window.innerHeight,
			near: 50,
			far: 1e7,

			rotateSpeed: 1.0,
			zoomSpeed: 1.2,
			panSpeed: 0.2,

			noZoom: false,
			noPan: false,

			staticMoving: false,
			dynamicDampingFactor: 0.3,

			minDistance: 200,
			maxDistance: 500,

			keys: [ 65, 83, 68 ], // [ rotateKey, zoomKey, panKey ],

			domElement: renderer.domElement
		});

		camera.position.z	= 2;
	}

	// call THREEx.WindowResize
	// - TODO is that enougth for trackboll camera ?
	// - webgl_trackballcamera_earth.html got more
	// - TODO should i add a callback to that ?
	THREEx.WindowResize(renderer, camera);
	
	// FIXME failed attemps
	// - seems to fail if the data url
	THREEx.ImageDrop(renderer, function(image){
		var material		= Emitter.container().materials[0];
		var uniforms		= material.uniforms;
		var texture		= uniforms['texture'].texture;
		//texture.image.src	= image.src;
		texture.image		= image;
		texture.needsUpdate	= true;
		//uniforms['texture'].needsUpdate	= true;
console.log("object3d", texture, "uniforms", uniforms['texture'], "newimage", image, "oldimage", texture.image);
	})

	// build the scene
	scene = new THREE.Scene();

	// define the containerObj of all the particle
	containerObj	= new THREE.Object3D();
	scene.addChild(containerObj)

	// parameters
	var parameters	= {
		nbItems		: 10000,
		textureUrl	: "images/lensFlare/Flare1.png",


		emitRate	: 30,
		timeToLive	: 2000,
		
		originZaValue	: Math.PI/2,
		originZaRange	: 30 * Math.PI/180,
		originZhValue	: 0,
		originZhRange	: 0,
		originRadiusValue	: 0.5,
		originRadiusRange	: 0.5,

		speedValue	: 1.5,
		speedRange	: 0.5,

		gravity		: 0.05,
		
		color		: new THREE.Color(0xFF5510),
		colorInc	: new THREE.Color().setRGB(0,0,0),
		

		opacitySrc	: 1.0,
		opacityInc	: 0.0,
		
		sizeSrc		: 16.0,
		sizeInc		:  0.0,

		rotationSrc	:  0.0,
		rotationInc	:  0.0
	};
	buildGui(parameters);

	// build the emitter
	Emitter	= new THREEx.Particle.Emitter(parameters);
	containerObj.addChild( Emitter.container() );

	// init the Stats
	stats	= new Stats();
	stats.domElement.style.position	= 'absolute';
	stats.domElement.style.bottom	= '0px';
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
	if( false ){		
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
