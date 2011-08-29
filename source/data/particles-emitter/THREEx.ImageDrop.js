var THREEx	= THREEx 		|| {};
THREEx.ImageDrop	= THREEx.ImageDrop	|| {};

THREEx.ImageDrop	= function(renderer, callback)
{
	callback	= callback	|| THREEx.ImageDrop.defaultCallback;
	var onDrop	= function(event){
		event.preventDefault();
		//console.log("DROPPED nfiles", event.dataTransfer.files.length)
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
	};
	var onDragOver	= function(event){
		// no idea why this one is needed
		// - without it the image replace the current page
		event.preventDefault();		
	}
	
	document.addEventListener("drop", onDrop, false);
	document.addEventListener("dragover", onDragOver, false);
	
	return {
		unbind	: function(){
			window.removeEventListener('drop'	, onDrop	);
			window.removeEventListener('dragover'	, onDragOver	);
		}
	}
}

THREEx.ImageDrop.defaultCallback	= function(imageUrl)
{
	window.open(imageUrl);
}
