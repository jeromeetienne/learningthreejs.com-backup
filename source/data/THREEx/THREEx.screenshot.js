/**
 * Define namespace
*/
if(typeof THREEx === "undefined")	var THREEx	= {};

/**
 * To make screenshot of the renderer output
 * - may contains ability to resize the image
 * - may contains ability to allow the user to download hte image
 * - What about receiving image from the desktop ?
 *   - here is unlikely the good place but this is a nice feature
*/

// forced closure
(function(){

	/**
	 * Take a screenshot of a renderer
	 * - require WebGLRenderer to have "preserveDrawingBuffer: true" to be set
	 * 
	 * @param {Object} renderer to use
	 * @param {String} mimetype of the output image. default to "image/png"
	 * @param {String} dataUrl of the image
	*/
	var toDataURL	= function(renderer, mimetype)
	{
		mimetype	= mimetype	|| "image/png";
		var dataUrl	= renderer.domElement.toDataURL(mimetype);
		return dataUrl;	
	}

	/**
	 * TODO do something to be able preserve the aspect
	*/

	var resizeTo	= function(imgUrl, width, height, callback){
		var img 	= new Image();   // Create new Image object
		img.onload	= function(){
			var canvas	= document.createElement('canvas');
			canvas.width	= width;
			canvas.height	= height;
			var ctx		= canvas.getContext('2d');

			// TODO is this needed
			ctx.fillStyle	= "black";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// actually draw the image
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

			//console.dir(document.body)
		
			var newDataUrl	= canvas.toDataURL("image/jpg");
			
			callback(newDataUrl)
		}.bind(this);
		img.src		= imgUrl;
	}

	// export it	
	THREEx.Screenshot	= {
		toDataURL	: toDataURL,
		resizeTo	: resizeTo
	};
})();
