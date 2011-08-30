// This THREEx helper makes it easy to handle window resize. It will update
// renderer and camera when window is resized
//
// # Usage
//
// **Start updating renderer and camera**
//
// ```var windowResize = THREEx.WindowResize(aRenderer, aCamera)```
//    
// **Stop updating**
//
// ```windowResize.unbind()```

/** @namespace */
var THREEx	= THREEx 		|| {};

/**
 * Update renderer and camera when the window is resized
 * 
 * @param {Object} renderer the renderer to update
 * @param {Object} Camera the camera to update
*/
THREEx.WindowResize	= function(renderer, camera){
	var callback	= function(){
		// notify the renderer of the size change
		renderer.setSize( window.innerWidth, window.innerHeight );
		// update the camera
		camera.aspect	= window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	}
	window.addEventListener('resize', callback, false);
	return {
		// function to call to unbind this event
		unbind	: function(){
			window.removeEventListener('resize', callback);
		}
	};
}
