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
	
	var toDataURL	= function(renderer)
	{
		var dataUrl	= renderer.domElement.toDataURL("image/jpg");
		console.log("dataUrl", dataUrl)
		return dataUrl;	
	}

	/**
	 * TODO do something to be able preserve the aspect
	*/

	var resizeTo	= function(imgUrl, width, height, callback){
		var img 	= new Image();   // Create new Image object
		img.onload	= function(){
			var canvas	= document.createElement('canvas');
			canvas.setAttribute('width'	, width);
			canvas.setAttribute('height'	, height);
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
