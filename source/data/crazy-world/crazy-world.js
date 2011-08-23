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
if ( !Detector.webgl ){
	Detector.addGetWebGLMessage();
}else{
	// initialiaze everything
	init();
	// make it move			
	animate();	
}

function buildHearthMaterial()
{
	var planetTexture	= THREE.ImageUtils.loadTexture( "images/earth_atmos_2048.jpg" );
	var normalTexture	= THREE.ImageUtils.loadTexture( "images/earth_normal_2048.jpg" );
	var specularTexture	= THREE.ImageUtils.loadTexture( "images/earth_specular_2048.jpg" );

	var shader	= THREE.ShaderUtils.lib[ "normal" ];
	var uniforms	= THREE.UniformsUtils.clone( shader.uniforms );

	uniforms[ "tNormal" ].texture		= normalTexture;
	uniforms[ "uNormalScale" ].value	= 0.85;

	uniforms[ "tDiffuse" ].texture		= planetTexture;
	uniforms[ "tSpecular" ].texture		= specularTexture;

	uniforms[ "enableAO" ].value		= false;
	uniforms[ "enableDiffuse" ].value	= true;
	uniforms[ "enableSpecular" ].value	= true;

	uniforms[ "uDiffuseColor" ].value.setHex( 0xffffff );
	uniforms[ "uSpecularColor" ].value.setHex( 0xaaaaaa );
	uniforms[ "uAmbientColor" ].value.setHex( 0x000000 );

	uniforms[ "uShininess" ].value		= 30;

	var material	= new THREE.MeshShaderMaterial({
		fragmentShader	: shader.fragmentShader,
		vertexShader	: shader.vertexShader,
		uniforms	: uniforms,
		lights		: true
	});

	return material;
}

// ## Initialize everything
function init() {

	// create the camera
	camera	= new THREE.Camera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z	= 80;
	camera.position.z	= 120;

	// create the Scene
	scene	= new THREE.Scene();


	var ambientLight= new THREE.AmbientLight( 0xFBB917, 5 );
	scene.addLight( ambientLight );

	var dirLight	= new THREE.DirectionalLight( 0xFBB917, 3.0 );
	var dirLight	= new THREE.DirectionalLight( 0xffffff, 3.0 );
	dirLight.position.set( 1, 1, 2 ).normalize();
	scene.addLight( dirLight );
		
	var pointLight	= new THREE.PointLight( 0xAA8888, 5, 300.0 );
	pointLight.position.set( 50, 50, 150 );
	scene.addLight( pointLight );
	
	//var pointLight	= new THREE.PointLight( 0xF00180, 5 );
	//pointLight.position.set( -50, 0, 10 );
	//scene.addLight( pointLight );

	var material	= new THREE.MeshNormalMaterial();
	var material	= new THREE.MeshPhongMaterial( {
		//opacity		: 0.5,
		//transparent	: false,
		//shininess	: 100.0,
		color		: 0xFFFFFF,
		ambient		: 0x222222,
		specular	: 0x886600,
		//specular	: 0x221100,
		//wireframe		: true,
		//wireframeLinewidth	: 10,
		map		: THREE.ImageUtils.loadTexture( "images/earth_atmos_2048.jpg" ),
		//lightMap	: THREE.ImageUtils.loadTexture( "images/earth_normal_2048.jpg" ),
		//lightMap	: THREE.ImageUtils.loadTexture( "images/earth_specular_2048.jpg" ),
	});
	//var material	= new THREE.MeshLambertMaterial( { color: 0xAA8822 } );

	var material	= [];
	material.push(new THREE.MeshPhongMaterial( { specular: 0xFF8800, color: 0x000, shininess: 500}) );
	material.push(new THREE.MeshLambertMaterial({
		map 	: THREE.ImageUtils.loadTexture( "images/earth_atmos_2048.jpg" ),
		//color	: 0x111111,
		ambient	: 0x888888,
		opacity	: 0.5
	}));
	//material.push( new THREE.MeshLambertMaterial( { color: 0xAA8822, opacity: 0.2 }) );
	//material.push( new THREE.MeshLambertMaterial( { color: 0xAA8822 } ) );
	//material.push( new THREE.MeshBasicMaterial( { color: 0xAA8822, wireframe: true } ) );

	//var material	= buildHearthMaterial();


	var geometry	= new THREE.CubeGeometry( 100, 100, 100 );
	//var geometry	= new THREE.TorusGeometry( 50, 20, 45, 45 );
	//var geometry	= new THREE.SphereGeometry( 50, 50, 50 );
	var geometry	= new THREE.SphereGeometry( 50, 25, 25 );
	geometry.computeTangents();


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
	//material	= [material, new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } )]; 
	
	// create the Mesh
	mesh	= new THREE.Mesh( geometry, material );
	
	// add the object to the scene
	scene.addObject( mesh );

	// build the coulds
	if( true ){
		var geometry		= new THREE.SphereGeometry( 50, 50, 50 );
		THREEx.GeometryCenter.center(geometry);
		THREEx.GeometryWobble.init(geometry);
		THREEx.GeometryWobble.cpuAxis(geometry, 'x', 0.02);

		var cloudsTexture	= THREE.ImageUtils.loadTexture( "images/earth_clouds_1024.png" );
		var cloudsMaterial	= new THREE.MeshLambertMaterial( { color: 0xffffff, map: cloudsTexture, transparent:true } );
		var cloudsScale		= 1.005;
		meshClouds		= new THREE.Mesh( geometry, cloudsMaterial );
		meshClouds.scale.set( cloudsScale, cloudsScale, cloudsScale );
		scene.addObject( meshClouds );		
	}


	// create the container element
	container	= document.createElement( 'div' );
	document.body.appendChild( container );

	// init the WebGL renderer and append it to the Dom
	renderer	= new THREE.WebGLRenderer({
		antialias		: true,
		//preserveDrawingBuffer	: true
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
	// update the tweens from TWEEN library
	TWEEN.update();
}

var tweenForward, tweenBackward;
// ## Render the 3D Scene
function render(){
	var time	= Date.now()/1000;


	var wobble	= function(){
		THREEx.GeometryWobble.Animate(mesh.geometry, time/Math.PI*15, new THREE.Vector3(15,25, 00));
		THREEx.GeometryWobble.Animate(meshClouds.geometry, time/Math.PI*15, new THREE.Vector3(15,25, 00));		
	}
	var funkyRotation	= function(){
		var speed	= 0.05;
		var rx		=  5.0 *Math.PI/180*speed;
		var ry		= 12.5 *Math.PI/180*speed;
		var rz		=  7.5 *Math.PI/180*speed;
		var inc		= new THREE.Vector3(rx, ry, rz);
		mesh.rotation.addSelf(inc);
		meshClouds.rotation.addSelf(inc);
	}
	var normalEarthRotation= function(){
		mesh.rotation.y		+= 0.0125/7.5;
		meshClouds.rotation.y	+= 3*0.0125/7.5;		
	}
	var heartbeat	= function(){
		var seconds	= (Date.now() - startTime)/1000;
		var angle	= 1.5*seconds*Math.PI;
		var scale	= Math.abs(Math.cos(angle));

		var from	= 1.0
		var to		= 1.1;
		var value	= from + (to-from) * scale;

		var scaleClouds	= 1.005;
		mesh.scale.x		= mesh.scale.y		= mesh.scale.z		= value;		
		meshClouds.scale.x	= meshClouds.scale.y	= meshClouds.scale.z	= scaleClouds * value;		
	}
	var zBounce0	= function(){
			// - may be nice as a vumeter
		var seconds	= (Date.now() - startTime)/1000;
		var angle	= seconds*Math.PI;
		//var angle	= (Date.now() - startTime)/300;
		//var scale	= 0.3*Math.sin(angle)*Math.sin(angle);
		var scale	= Math.sin(angle);
		var scale	= Math.sin(angle)*Math.sin(angle);
		//var scale	= Math.abs(Math.cos(angle));
		var scaleClouds	= 1.005;
		
		//scale	= 
		//var width	= 300;
		//scale= 0;
		//meshClouds.position.x	= mesh.position.x	= scale * width/2;
		//meshClouds.position.x	= scale * width/2;
		//return;
		var offset	= 1.0;
		var range	= 0.3;
		var value	= offset + range * scale;
		mesh.scale.x	= mesh.scale.y	= mesh.scale.z	= value;		
		meshClouds.scale.x	= meshClouds.scale.y	= meshClouds.scale.z	= scaleClouds * value;		
	}
	var zBounce	= function(){
		var scaleClouds	= 1.005;
		var update	= function(){
			mesh.scale.x		= mesh.scale.y		= mesh.scale.z		= this.v;		
			meshClouds.scale.x	= meshClouds.scale.y	= meshClouds.scale.z	= scaleClouds * this.v;		
		};

		// notion of mirror
		// notion of loop, nb loop
		
		if( tweenForward )	return;
		var loops	= 10;
		var duration	= 1000/2;
		
		var offset	= 1.0;
		var range	= 0.1;
		var from	= {v: offset + range};
		var to		= {v: offset - range};

		var position	= JSON.parse(JSON.stringify(from));
		tweenForward	= new TWEEN.Tween(position)
				.to(from, duration)
				.easing(TWEEN.Easing.Circular.EaseOut)
				.onUpdate(update);
		tweenBackward	= new TWEEN.Tween(position)
				.to(to, duration)
				.easing(TWEEN.Easing.Circular.EaseIn)
				.onUpdate(update)
				.onComplete(function(){
					loops--;

					var base	= 1.0;
					var range	= 1/(loops/3+1);
					from.v	= base + range/2 + range;
					to.v	= base + range/2 - range;

					if(loops != 0)	return;
					tweenForward.stop();
					tweenBackward.stop();
				});
		tweenForward.chain( tweenBackward );
		tweenBackward.chain( tweenForward );
		tweenForward.start();
	}
	
	// funky rotation
	//wobble();
	//funkyRotation();
	//normalEarthRotation();
	//zBounce0();
	zBounce();
	//heartbeat();

	// actually display the scene in the Dom element
	renderer.render( scene, camera );
}
