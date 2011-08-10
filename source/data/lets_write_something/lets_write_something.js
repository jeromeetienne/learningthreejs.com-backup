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

	projector	= new THREE.Projector();
	
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
	
	var addPost	= function(postItem){
		// create the parent Object3D
		var parent	= new THREE.Object3D();
		
		var geometry	= new THREE.TextGeometry(postItem.title, {
			size		: 30,
			height		: 10,
			bezelThickness	: 2,
			bezelSize	: 1.5,
			bezelEnabled	: true
		});	
		title	= new THREE.Mesh(geometry, new THREE.MeshPhongMaterial( { color: 0x4040a0 } ) );
		title.rotation.y	= 40*Math.PI/180;
		parent.addChild( title );
		
		title._userdata	= {
			type	: "title",
			data	: postItem
		}
		THREE.Collisions.colliders.push( THREE.CollisionUtils.MeshOBB( title ) );
		
		
		var geometry	= new THREE.TextGeometry("(+)", {
			size	: 30,
			height	: 10
		});
		comments	= new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: 0x808080 } ) );
		comments.position.y	= -50;
		comments.rotation.y	= 40*Math.PI/180;
		parent.addChild( comments );

		comments._userdata	= {
			type	: "comments",
			data	: postItem
		}
		THREE.Collisions.colliders.push( THREE.CollisionUtils.MeshOBB( comments ) );

		return parent;
	}


	mesh	= addPost({
		title	: "Large-scale Amazon EC2 Outage",
		comments: "http://news.ycombinator.com/item?id=2862566",
		link	: "http://status.aws.amazon.com/"
	})
	scene.addChild(mesh)

	

if(false){
	var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20feed%20where%20url%3D'http%3A%2F%2Fnews.ycombinator.com%2Frss'&format=json&diagnostics=false&callback=?";
	jQuery.getJSON(url, function(json){
		var items	= json.query.results.item;
		var item	= items[0]
		console.log("data", json);
	});	
}

	// create the container element
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	
	container.onmousemove	= onDocumentMouseMove;
	container.onclick	= onDocumentClick;

	// init the WebGL renderer and append it to the Dom
	renderer = new THREE.WebGLRenderer({
		antialias	: true
	});
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
	var ray		= new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );
	var collided	= THREE.Collisions.rayCastNearest( ray );

	if( collided ){
		console.log("collide", collided.mesh._userdata)
		var userdata	= collided.mesh._userdata;
		if( userdata.type === 'title' )
			var url	= userdata.data.link;
		else if( userdata.type === 'comments' )
			var url	= userdata.data.comments;
		else	console.assert(false);
		window.open(url);
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


	var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
	projector.unprojectVector( vector, camera );
	var ray		= new THREE.Ray( camera.position, vector.subSelf( camera.position ).normalize() );
	var collided	= THREE.Collisions.rayCastNearest( ray );

	title.materials[0].color.setHex( 0x003300 );
	comments.materials[0].color.setHex( 0x003300 );

	if( collided ){
		document.body.style.cursor	= 'pointer';
		collided.mesh.materials[0].color.setHex( 0x000033 );
	} else {
		document.body.style.cursor	= '';
	}

	// animate the mesh
	//mesh.rotation.x += 0.02;
	mesh.rotation.y += 0.0125;
	//mesh.rotation.z += 0.0175;

	// actually display the scene in the Dom element
	renderer.render( scene, camera );
}


var displayInfo	= function(gl)
{
	var display	= function(prefix, value){
		console.log(prefix, ":", value)
	}
	console.log("")
	display("Platform: ", navigator.platform);
	display("Broswer User Agent: ", navigator.userAgent);

	var prout	= ['VERSION', 'SHADING_LANGUAGE_VERSION', 'VENDOR', 'RENDERER'];
	
	document.writeln('This browser supports WebGL!');
	display("GL Version: ", gl.getParameter(gl.VERSION));
	var shadingLanguageVersion = gl.getParameter(gl.SHADING_LANGUAGE_VERSION);
	display("Shading Language Version: ", shadingLanguageVersion);
	var vendor = gl.getParameter(gl.VENDOR);
	display("Vendor: ", vendor);
	var renderer = gl.getParameter(gl.RENDERER);
	display("Renderer: ", renderer);

	var pixDepth	= ['RED_BITS', 'GREEN_BITS', 'BLUE_BITS', 'ALPHA_BITS', 'DEPTH_BITS', 'STENCIL_BITS'];
	
	display("<br/><u>Pixel Depths</u>");		
	var redBits = gl.getParameter(gl.RED_BITS);
	display("Red Bits: ", redBits );
	var greenBits = gl.getParameter(gl.GREEN_BITS);
	display("Green Bits: ", greenBits );
	var blueBits = gl.getParameter(gl.BLUE_BITS);
	display("Blue Bits: ", blueBits );
	var alphaBits = gl.getParameter(gl.ALPHA_BITS);
	display("Alpha Bits: ", alphaBits );
	var depthBits = gl.getParameter(gl.DEPTH_BITS);
	display("Depth Bits: ", depthBits );
	var stencilBits = gl.getParameter(gl.STENCIL_BITS);
	display("Stencil Bits: ", stencilBits);
	
	display("<br/><u>Implementation Dependent States</u>");
        var maxRenderBufferSize = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE);
        display("Max. Render Buffer Size: ", maxRenderBufferSize);
	var maximumCombinedTextureImageUnits = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS); // min: 8
	display("Max. Combined Texture Image Units: ", maximumCombinedTextureImageUnits);
	var maximumCubeMapTextureSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);               // min: 16
	display("Max. Cube Map Texture Size: ", maximumCubeMapTextureSize);
	var maximumFragmentUniformVectors = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);        // min: 16
	display("Max. Fragment Uniform Vectors: ", maximumFragmentUniformVectors);
	var maximumTextureImageUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);                  // min: 8
	display("Max. Texture Image Units: ", maximumTextureImageUnits);
	var maximumTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);                               // min: 64
	display("Max. Texture Size: ", maximumTextureSize);
	var maximumVaryingVectors = gl.getParameter(gl.MAX_VARYING_VECTORS);                         // min: 8
	display("Max. Varying Vectors", maximumVaryingVectors);
	var maximumVertexAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);                        // min: 8
	display("Max. Vertex Attributes", maximumVertexAttributes);
	var maximumVertexTextureImageUnits = gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);     // min: 0
	display("Max. Vertex Texture Image Units: ", maximumVertexTextureImageUnits || '0');
	var maximumVertexUniformVectors = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);            // min: 128
	display("Max. Vertex Uniform Vectors", maximumVertexUniformVectors);
	
	
	var aliasedLineWidthRange = gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE); // must include the value 1
	display("Aliased Line Width Range: ", '[' + 
		aliasedLineWidthRange[0] + ", " +
		aliasedLineWidthRange[1] + ']');
	
	var aliasedPointSizeRange = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE); // must include the value 1 
	display("Aliased Point Size Range: ", '[' + 
		aliasedPointSizeRange[0] + ", " +
		aliasedPointSizeRange[1] + ']');
		
	var maximumViewportDimensions = gl.getParameter(gl.MAX_VIEWPORT_DIMS);
	display("Max. Viewport Dimensions", '[' + 
		maximumViewportDimensions[0] + ", " +
		maximumViewportDimensions[1] + ']');
		
	display('<br/><u>Supported Extensions:</u>');			
	var extensions = gl.getSupportedExtensions();
	if(extensions.length > 0) {
		for(var i = 0; i < extensions.length; i++) {
			display(extensions[i]);
		}
	}
	else {
		display("No extensions were found.");
	}
	
	
	console.log("gl", Object.getOwnPropertyNames(gl));
	console.dir(gl)
}
displayInfo(renderer.getContext());
