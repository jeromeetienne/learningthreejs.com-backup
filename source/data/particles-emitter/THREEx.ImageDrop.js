var THREEx	= THREEx 		|| {};
THREEx.ImageDrop	= THREEx.ImageDrop	|| {};

THREEx.ImageDrop	= function(renderer, callback)
{
	callback	= callback	|| THREEx.ImageDrop.defaultCallback;
	
	document.addEventListener("drop", function(event){
		event.preventDefault();
		//console.log("DROPPED", event.dataTransfer.files.length)
		for(var i = 0; i < event.dataTransfer.files.length; i++){
			var file	= event.dataTransfer.files[i];
			// TODO what about checking it is an image
			var reader	= new FileReader();
			reader.onload = function (event) {
				var imageUrl	= event.target.result;
				callback(imageUrl);
			};
			reader.readAsDataURL(file);
		}
	}, true);
	// no idea why this one is needed
	// - without it the image replace the current page
	document.addEventListener("dragover", function(event){
		event.preventDefault();
	}, true);
}

THREEx.ImageDrop.defaultCallback	= function(imageUrl)
{
	window.open(imageUrl);
}
