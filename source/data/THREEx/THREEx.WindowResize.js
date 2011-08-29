/** @namespace */
var THREEx	= THREEx 		|| {};

/**
 * Adjust the display when the window is resized
*/
THREEx.WindowResize	= function(renderer, camera){
	var callback	= function(){
		renderer.setSize( window.innerWidth, window.innerHeight );
		camera.aspect	= window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix()
	}
	window.addEventListener('resize', callback, false);
	return {
		unbind	: function(){
			window.removeEventListener('resize', callback);
		}
	}
}
