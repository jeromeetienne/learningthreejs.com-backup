---
layout: post
title: "Three.js Lesson 1: Starting with Three.js"
date: 2011-10-09 12:00
comments: true
categories: ['webgl', 'basics', 'three.js', 'tutorials', 'lessons']
---

[Three.js](https://github.com/mrdoob/three.js) is a 3D library in javascript. According
to [mrdoob](http://mrdoob.com/), its author, three.js is

{% blockquote mrdoob, tree.js author %}
The aim of the project is to create a lightweight 3D engine with a very low level of
complexity — in other words, for dummies. The engine can render using canvas, svg and WebGL.
{% endblockquote %}


If you can read [the “Three.js Installation” post](http://learningthreejs.com/blog/2011/07/15/threejs-installation/) if you want to know more about how the github part works.

Even though Three.js is aimed to be for dummies, without any solid documentation it’s hard to get started. In the Three.js lessons posts I try to teach you how to get started with Three.js.
<!-- more -->

Three.js uses javascript to manipulate the new HTML5 canvas element. Where available Three.js can also render WebGL content on the canvas element.

*Please note:* Three.js is under constant development. Therefore code found on the web using Three.js might not work with the latest version. Read the end of the post for important information regarding breaking code. The code below is based on [Three.js r45](https://github.com/mrdoob/three.js/blob/r45/build/Three.js).

#Setting up the necessary folders and code

I advise you to make a folder on your computer, so you can have all files in the same folder. It’s the same as how you would do it when making a website.

In order to get it running we need to start with a HTML5 page:
```
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>My first Three.js</title>
</head>

<body>
</body>
</html>
```

Save this as lesson1.html in the folder you just saved.
Also create a subfolder called “js”.

In order to get the necessary javascript files you can download them:
* Three.js: http://mrdoob.github.com/three.js/build/Three.js
* Detector.js: http://mrdoob.github.com/three.js/examples/js/Detector.js
* RequestAnimationFrame.js: http://mrdoob.github.com/three.js/examples/js/RequestAnimationFrame.js
* Stats.js: http://mrdoob.github.com/three.js/examples/js/Stats.js

Download and save them in the js folder we created.

We add the javascript files right before the closing of the body tag:
```
<body>
<script type="text/javascript" src="js/Three.js"></script>
<script type="text/javascript" src="js/Detector.js"></script>
<script type="text/javascript" src="js/RequestAnimationFrame.js"></script>
<script type="text/javascript" src="js/Stats.js"></script>
</body>
</html>
```

More info about the specific .js files:
* Three.js: This is where the THREE magic happens.
* Detector.js: This enables us to test if WebGL is supported by the browser and handle accordingly. Like providing a fallback using basic canvas rendering.
* RequestAnimationFrame.js: Provides requestAnimationFrame in a cross browser way. [You can read more about it in this post](http://paulirish.com/2011/requestanimationframe-for-smart-animating/). 
* Stats.js: Enables a fps indicator to keep track of your frames per second. This should be removed when in production. But while we are still developing we can use it to see what is happening.

#Setting up the basic 3D space

Okay now we got the tools ready, but we still need to make it happen.

First lets add the html part right after the start of the <body> tag but before the <script>:
```
<body>
<div id="container">
    <br /><br /><br /><br /><br />
    <h2>LOADING...</h2>
</div>
<script type="text/javascript" src="js/Three.js"></script>
```

This container will be used as a placeholder for our Three.js rendering (WebGL or basic Canvas). We added the <h2>LOADING…</h2> this way the user will see something while waiting for the magic to happen. This will also be used to display a message in case the browser doesn’t support WebGL or even if the graphics card doesn’t support WebGL.

*OPTIONAL:* You could style your html by using CSS:
```
	<title>My first Three.js</title>
<style type="text/css">
	/*Make sure there is no whitespace around our container element*/
	body,html{margin:0;padding:0;}
	/*If there is any more content than what would fit in the viewport, hide it. So no scrollbars.*/
	body{overflow:hidden;}
	/*Center the text in our h2 element*/
	h2{text-align:center;}
</style>

</head>
```

**WHAT YOU SEE:** Up to this point if you opened the html file in your browser you would only see:
* LOADING… 

Let’s add the code to: 
* check if WebGL is supported
* add a renderer 
* add fps stats object
```
<script type="text/javascript" src="js/Stats.js"></script>

<script type="text/javascript">
	//==Best practice: setup the needed variables, these are global variables. 
	//So they are also attached to the window object. E.g. window.container would work as well.
	//More info: http://snook.ca/archives/javascript/global_variable	
var container, renderer, stats;
	//Set up the desired width and height of the render size. Declaring it improves javascript performance by caching it. 
	//It's also declared as a global variable, so it can be changed anywhere in the code. E.g. on window resize.
	//==Best practice: CAPITALS are used to indicate it being a global variable.
	var RENDERWIDTH = window.innerWidth;
	var RENDERHEIGHT = window.innerHeight;
//Provide var to store independent WebGL check result. So it will also work if you decide to use something else but Detector.js
	var WebGLSupported = Detector.webgl;
	
	//Fetch the div with id="container" (DOM element) and cache it.
	container = document.getElementById( 'container' );
	//Detect if WebGL is supported
	if ( ! Detector.webgl ) {
		//WebGL is not supported, output what is causing the issue and where to get more info:
		Detector.addGetWebGLMessage();
		//Empty the container E.g. Remove the LOADING...
		container.innerHTML = "";
	}
	
	//Make sure to call the init() function to run it once at start up
	init();
	
	//==Best practice: setup a function to be called only once on start up
	function init(){
		//Set up the renderer. If WebGL is supported use the most advanced renderer, otherwise use the basic canvas renderer.
		renderer = WebGLSupported ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
		//Set up a "screen resolution" for the renderer. In other words what size to render to. In this case use browser viewport width and height.
		renderer.setSize( RENDERWIDTH, RENDERHEIGHT );
		
		//Empty the container E.g. Remove the LOADING...
		container.innerHTML = "";
		//Attach the renderer to the container
		container.appendChild( renderer.domElement );
		
		//Initialise the Stats object
		stats = new Stats();
		//Apply CSS styling using JavaScript
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '0px';
		//Adds the stats to the container
		container.appendChild( stats.domElement );
	}
</script>
</body>
```

Let’s add a scene where it is all going to happen:
```
//Adds the stats to the container
	container.appendChild( stats.domElement );
		
	//Create a scene
	scene = new THREE.Scene();
}
```

Also don’t forget to update the global variables!
```var container, renderer, stats;``` becomes ```var container, renderer, stats, scene;```

Let’s add a camera to view with while things are going to happen :
```
//Create a scene
		scene = new THREE.Scene();
		
		//Create a camera
			//new THREE.PerspectiveCamera(fov,aspect ration, near, far);
			//Set field of view. Higher number is wider view, but more destortion.
			//The approximate field of view of a human eye is 95° out, 75° down, 60° in, 60° up.
			//Source: http://en.wikipedia.org/wiki/Human_eye#Field_of_view
			//Aspect ratio of the camera. Dynamically calculated based on width divided by height.
			//More info: http://en.wikipedia.org/wiki/Digital_photography#A_comparison_of_frame_aspect_ratios
			//Camera will only show objects in the viewing frustum. 
			//More info: http://en.wikipedia.org/wiki/Viewing_frustum
			//Anything nearer to the camera than this will not be shown.
			//Anything further away from the camera than this will not be shown.
//https://github.com/mrdoob/three.js/blob/master/src/cameras/PerspectiveCamera.js
		camera = new THREE.PerspectiveCamera( 75, RENDERWIDTH / RENDERHEIGHT, 1, 20000 );
// Position the camera (x,y,z)
		camera.position.set( -400, 10, 200 );
	}
```
You can read more about:
* [the field of view of the human eye](http://en.wikipedia.org/wiki/Human_eye#Field_of_view) 
* [frame aspect ratio](http://en.wikipedia.org/wiki/Digital_photography#A_comparison_of_frame_aspect_ratios)
* [viewing frustum](http://en.wikipedia.org/wiki/Viewing_frustum)

Also don’t forget to update the global variables!
```var container, renderer, stats, scene;``` becomes ```var container, renderer, stats, scene, camera;```

**WHAT YOU SEE:** Up to this point if you opened the html file in your browser you would only see:
* white space
This is because nothing gets rendered and nothing is “running”.

We’ll fix that now by adding a render() and animate() function:
Calling the animate() function right after init();
```
//Make sure to call the init() function to run it once at start up
	init();
	//Start the whole animation/looping of renders to make it update the renderer.
	animate();
	
	//==Best practice: setup a function to be called only once on start up
	function init(){
```
Defining the render() and  the animate() function right after the init(){} function;
```
		// Position the camera (x,y,z)
		camera.position.set( -400, 10, 200 );
	
	function render(){
		//Make the renderer render the specified scene and camera and outputs it to the placeholder DOM element.
		//To render a different scene or camera, just pass the right object as the parameters.
		//For now we only have 1 scene called "scene" and only 1 camera called "camera".
		renderer.render( scene, camera );
	}
	function animate(){
		//Requests for animating a frame, calling the animate function again and thus going into a loop.
		//More info: http://paulirish.com/2011/requestanimationframe-for-smart-animating/
		requestAnimationFrame( animate );

		//Call the render() function and thus rendering the scene.
		render();
		//Update the stats to show the FPS.
		stats.update();
	}
</script>
```

**WHAT YOU SEE:** Up to this point if you opened the html file in your browser you would only see:
* white space AND! the stats updating the fps (WOOT!)… unless you did something wrong :(
This is because nothing gets rendered but now things are “running” thanks to our render() and animate() functions.

#Adding stuff to be shown

Everything is ready, let’s start adding object(s) to the scene so we can finally see more than just whitespace.
```
// Position the camera (x,y,z)
		camera.position.set( -400, 10, 200 );
		
		//Adding geometry
		//Create the geometry of a plane (width, height, segmentsWidth, segmentsHeight)
		//https://github.com/mrdoob/three.js/blob/master/src/extras/geometries/PlaneGeometry.js
		var planeGeo = new THREE.PlaneGeometry(800, 800);
		//Create the material for the plane
		//Check if we are using WebGL or basic canvas and use the best when possible.
		var materialClass = WebGLSupported ? THREE.MeshLambertMaterial : THREE.MeshBasicMaterial;
		//Create a red color material (0x + RRGGBB) where R = hexadecimal red value, G = hexadecimal green value, B = hexadecimal blue value
		var colorRed =  new materialClass( { color: 0xFF0000 } );
		//Actually create the geometry of a plane with the specified material
		var plane = new THREE.Mesh(planeGeo, colorRed);
		//We can rotate the plane
		plane.rotation.x = -Math.PI/2;
		//We can set a position(x,y,z)
		plane.position.set(0,0,0);
		//We need to place it in a scene
		scene.add(plane);		
	}
	
	function render(){
```

**WHAT YOU SEE:** Up to this point if you opened the html file in your browser you would NOT only see:
* white space and a fancy FPS indicator
But for the first time you also get to see:
* a red plane!

*Tip!:* At the end of the post you can read more about how Three.js’ XYZ coordinates work.

Let’s add a sphere and a cube, this time with a different way of defining the materials:
```
//We need to place it in a scene
		scene.add(plane);		
		
		
		//Create the geometry of a sphere (radius, segmentsWidth, segmentsHeight)
		//https://github.com/mrdoob/three.js/blob/master/src/extras/geometries/SphereGeometry.js
		var sphere =  new THREE.Mesh( new THREE.SphereGeometry( 50, 16, 16), new THREE.MeshLambertMaterial({color: 0xCC0000}) );
		sphere.position.set(0,0,0);
		scene.add( sphere );
		
		//Create the geometry of a cube (width, height, depth, segmentsWidth, segmentsHeight, segmentsDepth, materials, sides)
		//https://github.com/mrdoob/three.js/blob/master/src/extras/geometries/CubeGeometry.js
		var cube = new THREE.Mesh( new THREE.CubeGeometry( 200, 200, 200), new THREE.MeshBasicMaterial( { color: 0xe0e0e0 } ));
		cube.position.set(0,0,400);
		scene.add( cube );
	}
	
	function render(){
```

**WHAT YOU SEE:** Up to this point if you opened the html file in your browser you would only see:
* the red plane
This is because the placed geometry is not within the camera’s [viewing frustum](http://en.wikipedia.org/wiki/Viewing_frustum) (view)!

Let’s add controls to our camera so we can move it around:
```
// Position the camera (x,y,z)
		camera.position.set( -400, 10, 200 );
		
		//Controlling the camera
		//Bind to controls to camera object
		controls = new THREE.FirstPersonControls( camera );
		//Set speed to move forward with
		controls.movementSpeed = 1000;
		//Set speed to look around with
		controls.lookSpeed = 0.125;
		//Can we look vertical (up/down) with this camera
		controls.lookVertical = true;
		//Do we want to limit the vertical movement
		controls.constrainVertical = false;
		
		//Adding geometry
```

Also don’t forget to update the global variables!
```var container, renderer, stats, scene, camera;``` becomes ```var container, renderer, stats, scene, camera, controls;```

**WHAT YOU SEE:** Up to this point if you opened the html file in your browser you would only see:
* the red plane
This is because we haven’t told the renderer yet to update the controls!

Let’s fix this by adding it to our render() function:
```
function render(){
		//Update the controls
		controls.update();
		//Make the renderer render the specified scene and camera and outputs it to the placeholder DOM element.
		//To render a different scene or camera, just pass the right object as the parameters.
		//For now we only have 1 scene called "scene" and only 1 camera called "camera".
		renderer.render( scene, camera );
	}
```
**Congratulations:** You are now god almighty and creator of 3D space!
You now have new ways of travelling:
* To look around: use the mouse
* To move sideways: use left and right arrow on the keyboard
* To move back: use down arrow on the keyboard or hold the right mouse button
* To move forward: use up arrow on the keyboard or hold the left mouse button

**Please note:** If you fly below the plane, you won’t see it anymore. This is because by default faces are only rendered on one side (outside). The same goes for the other geometry if you fly in it.

This is fun, let’s add some more!

You can go ahead and experiment yourself OR head over to lesson 2 (not yet available) to continue your journey through the dense bushes of Three.js!

#End of lesson 1
If you followed along you should now have the following code (160 lines):
```
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>My first Three.js</title>
<style type="text/css">
	/*Make sure there is no whitespace around our container element*/
	body,html{margin:0;padding:0;}
	/*If there is any more content than what would fit in the viewport, hide it. So no scrollbars.*/
	body{overflow:hidden;}
	/*Center the text in our h2 element*/
	h2{text-align:center;}
</style>

</head>

<body>
<div id="container">
    <br /><br /><br /><br /><br />
    <h2>LOADING...</h2>
</div>

<script type="text/javascript" src="js/Three.js"></script>
<script type="text/javascript" src="js/Detector.js"></script>
<script type="text/javascript" src="js/RequestAnimationFrame.js"></script>
<script type="text/javascript" src="js/Stats.js"></script>

<script type="text/javascript">
	//==Best practice: setup the needed variables, these are global variables. 
	//So they are also attached to the window object. E.g. window.container would work as well.
	//More info: http://snook.ca/archives/javascript/global_variable
	var container, renderer, stats, scene, camera, controls;
	//Set up the desired width and height of the render size. Declaring it improves javascript performance by caching it. 
	//It's also declared as a global variable, so it can be changed anywhere in the code. E.g. on window resize.
	//==Best practice: CAPITALS are used to indicate it being a global variable.
	var RENDERWIDTH = window.innerWidth;
	var RENDERHEIGHT = window.innerHeight;
	//Provide var to store independent WebGL check result. So it will also work if you decide to use something else but Detector.js
	var WebGLSupported = Detector.webgl;
	
	//Fetch the div with id="container" (DOM element) and cache it.
	container = document.getElementById( 'container' );
	
	//Detect if WebGL is supported
	if ( ! Detector.webgl ) {
		//WebGL is not supported, output what is causing the issue and where to get more info:
		Detector.addGetWebGLMessage();
		//Empty the container E.g. Remove the LOADING...
		container.innerHTML = "";
	}
	
	//Make sure to call the init() function to run it once at start up
	init();
	//Start the whole animation/looping of renders to make it update the renderer.
	animate();
	
	//==Best practice: setup a function to be called only once on start up
	function init(){
		//Set up the renderer. If WebGL is supported use the most advanced renderer, otherwise use the basic canvas renderer.
		renderer = WebGLSupported ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
		//Set up a "screen resolution" for the renderer. In other words what size to render to. In this case use browser viewport width and height.
		renderer.setSize( RENDERWIDTH, RENDERHEIGHT );
		
		//Empty the container E.g. Remove the LOADING...
		container.innerHTML = "";
		//Attach the renderer to the container
		container.appendChild( renderer.domElement );
		
		//Initialise the Stats object
		stats = new Stats();
		//Apply CSS styling using JavaScript
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '0px';
		//Adds the stats to the container
		container.appendChild( stats.domElement );
		
		//Create a scene
		scene = new THREE.Scene();
		
		//Create a camera
			//new THREE.PerspectiveCamera(fov,aspect ration, near, far);
			//Set field of view. Higher number is wider view, but more destortion.
			//The approximate field of view of a human eye is 95° out, 75° down, 60° in, 60° up.
			//Source: http://en.wikipedia.org/wiki/Human_eye#Field_of_view
			//Aspect ratio of the camera. Dynamically calculated based on width divided by height.
			//More info: http://en.wikipedia.org/wiki/Digital_photography#A_comparison_of_frame_aspect_ratios
			//Camera will only show objects in the viewing frustum. 
			//More info: http://en.wikipedia.org/wiki/Viewing_frustum
			//Anything nearer to the camera than this will not be shown.
			//Anything further away from the camera than this will not be shown.
			//https://github.com/mrdoob/three.js/blob/master/src/cameras/PerspectiveCamera.js
		camera = new THREE.PerspectiveCamera( 75, RENDERWIDTH / RENDERHEIGHT, 1, 20000 );
		
		// Position the camera (x,y,z)
		camera.position.set( -400, 10, 200 );
		
		//Controlling the camera
		//Bind to controls to camera object
		controls = new THREE.FirstPersonControls( camera );
		//Set speed to move forward with
		controls.movementSpeed = 1000;
		//Set speed to look around with
		controls.lookSpeed = 0.125;
		//Can we look vertical (up/down) with this camera
		controls.lookVertical = true;
		//Do we want to limit the vertical movement
		controls.constrainVertical = false;
				
		//Adding geometry
		//Create the geometry of a plane (width, height, segmentsWidth, segmentsHeight)
		//https://github.com/mrdoob/three.js/blob/master/src/extras/geometries/PlaneGeometry.js
		var planeGeo = new THREE.PlaneGeometry(800, 800);
		//Create the material for the plane
		//Check if we are using WebGL or basic canvas and use the best when possible.
		var materialClass = WebGLSupported ? THREE.MeshLambertMaterial : THREE.MeshBasicMaterial;
		//Create a red color material (0x + RRGGBB) where R = hexadecimal red value, G = hexadecimal green value, B = hexadecimal blue value
		var colorRed =  new materialClass( { color: 0xFF0000 } );
		//Actually create the geometry of a plane with the specified material
		var plane = new THREE.Mesh(planeGeo, colorRed);
		//We can rotate the plane
		plane.rotation.x = -Math.PI/2;
		//We can set a position(x,y,z)
		plane.position.set(0,0,0);
		//We need to place it in a scene
		scene.add(plane);		
		
		//Create the geometry of a sphere (radius, segmentsWidth, segmentsHeight)
		//https://github.com/mrdoob/three.js/blob/master/src/extras/geometries/SphereGeometry.js
		var sphere =  new THREE.Mesh( new THREE.SphereGeometry( 50, 16, 16), new THREE.MeshLambertMaterial({color: 0xCC0000}) );
		sphere.position.set(0,0,0);
		scene.add( sphere );
		
		//Create the geometry of a cube (width, height, depth, segmentsWidth, segmentsHeight, segmentsDepth, materials, sides)
		//https://github.com/mrdoob/three.js/blob/master/src/extras/geometries/CubeGeometry.js
		var cube = new THREE.Mesh( new THREE.CubeGeometry( 200, 200, 200), new THREE.MeshBasicMaterial( { color: 0xe0e0e0 } ));
		cube.position.set(0,0,400);
		scene.add( cube );
	}
	
	function render(){
		//Update the controls
		controls.update();
		//Make the renderer render the specified scene and camera and outputs it to the placeholder DOM element.
		//To render a different scene or camera, just pass the right object as the parameters.
		//For now we only have 1 scene called "scene" and only 1 camera called "camera".
		renderer.render( scene, camera );
	}
	function animate(){
		//Requests for animating a frame, calling the animate function again and thus going into a loop.
		//More info: http://paulirish.com/2011/requestanimationframe-for-smart-animating/
		requestAnimationFrame( animate );

		//Call the render() function and thus rendering the scene.
		render();
		//Update the stats to show the FPS.
		stats.update();
	}
</script>
</body>
</html>
```

SOURCE FILES:
- [download](/data/threejslesson1/threejslesson1.zip)
- [live demo](/data/threejslesson1/lesson1.html)

#EXTRA:
##XYZ coordinates explained:

Three.js uses the X Y Z coordinates when positioning objects.

If you look straight at it: 
* X is the horizontal line. (minus value goes left, positive value goes right)
* Y is the vertical line. (minus value goes down, positive value goes up)
* Z is the depth. (minus value goes to the back, positive value goes to the front)

{% img right /data/threejslesson1/3dspace.png Integrated %}

**Please note:** This works different from some other 3D programs where the Z and Y axis are swapped!



##LEARNING FROM EXAMPLES
Examples sometimes give errors when trying to run with the latest version of three.js, this is because three.js is not always backwards compatible:
* ImageUtils.loadTexture( needs to be THREE.ImageUtils.loadTexture (same goes for other non prefixed three.js functions)
* new Cube( needs to be new THREE.CubeGeometry(
* cameras have changed and splitted into controls and cameras:
-> FirstPersonCamera.js, FlyCamera.js, PathCamera.js RollCamera.js, TrackballCamera.js are now splitted into PerspectiveCamera.js and [controls](https://github.com/mrdoob/three.js/tree/master/src/extras/controls)

