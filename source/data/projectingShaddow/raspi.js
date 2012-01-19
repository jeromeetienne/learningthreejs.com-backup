(function (global) {
	'use strict';
	'use restrict';
	
	var container = global.document.getElementById('container');
	var cwidth = 800;
	var cheight = 600;
	
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 70, cwidth / cheight, 1, 10000 );
	// Camera position is set in render loop
	scene.add(camera);
	
	console.log(camera);
	
	var board = new THREE.Mesh( new THREE.CubeGeometry(85.60, 1.7, 53.98), new THREE.MeshLambertMaterial({ color: 0x0B3E20, shading: THREE.FlatShade }) );
	board.material.ambient = board.material.color;
	board.castShadow = true;
	board.receiveShadow = true;
	scene.add(board);
	var cube = new THREE.Mesh( new THREE.CubeGeometry(25, 25, 25), new THREE.MeshLambertMaterial({ color: 0xff0000, shading: THREE.FlatShade }) );
	cube.material.ambient = cube.material.color;
	cube.position.y = 15;
	cube.castShadow = true;
	cube.receiveShadow = true;
	scene.add(cube);
	
	var ambient = new THREE.AmbientLight( 0x444444 );
	scene.add( ambient );
	
	var light = new THREE.DirectionalLight( 0xffffff );
	light.position.set( 100, 200, 300 );
	light.position.setLength(100);
	light.castShadow = true;
	light.shadowCameraLeft = -50;
	light.shadowCameraRight = 50;
	light.shadowCameraTop = 50;
	light.shadowCameraBottom = -50;

	//light.shadowCameraVisible = true;

	light.shadowDarkness = 0.5;
	
	scene.add(light);
	
	
	var renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize( cwidth, cheight );
	renderer.shadowMapEnabled = true;
	renderer.shadowMapSoft = false;
	console.log(renderer);
	container.appendChild( renderer.domElement );
	
	var t = 0;
	function render() {
		camera.position.x = 85*Math.cos(t);
		camera.position.z = 85*Math.sin(t);
		camera.position.y = 20+10*Math.cos(t*2);
		camera.position.setLength(85);
		camera.lookAt(new THREE.Vector3(0, 0, 0));
		renderer.render( scene, camera );
	};
	function animate() {
		
		requestAnimationFrame( animate );
		
		render();
		t+=0.01;
	};
	animate();
	
	
}(self));