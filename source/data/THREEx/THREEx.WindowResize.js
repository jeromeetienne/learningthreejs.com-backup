/** @namespace */
var THREEx	= THREEx 		|| {};

/**
 * Adjust the display when the window is resized
*/
THREEx.WindowResize	= function(renderer, camera){
	var callback	= function(){
		// notify the renderer of the size change
		renderer.setSize( window.innerWidth, window.innerHeight );
		// update the camera
		camera.aspect	= window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix()
	}
	window.addEventListener('resize', callback, false);
	return {
		// function to call to unbind this event
		unbind	: function(){
			window.removeEventListener('resize', callback);
		}
	}
}
