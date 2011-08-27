var clearCanvas	= function(ctx, fillStyle)
{
	fillStyle	= fillStyle	|| "#ffffff";
	ctx.save();
	ctx.fillStyle	= fillStyle;
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.restore();	
}

var canvasHexagone	= function(ctx, posX, posY, radius)
{
	var edgeLength	= radius * Math.sin(Math.PI/6) * 2;

console.log("edgeLength", edgeLength)

	ctx.beginPath();
	ctx.translate(posX, posY);
	
	ctx.rotate(0.5 *Math.PI/3);

	// add each Edge
	var nbEdges	= 6;
	for(var i = 0; i < nbEdges; i++){
		ctx.lineTo(edgeLength,0);
		ctx.rotate(Math.PI / 3);
	}

	ctx.closePath();	
}

var canvasNode	= function(ctx, posX, posY, radius, style)
{
	// set default parameters
	radius	= radius !== undefined ? radius	: 30;
	style	= style	|| "#8BC84B";


	ctx.save();
	canvasHexagone(ctx, posX, posY, radius);
	ctx.fillStyle	= style;
	ctx.fill();
	ctx.restore();
	
	var nbBorders	= 3;	
	for(var i = 0; i < nbBorders; i++){
		radius	*= 1.5;
		ctx.save();
		canvasHexagone(ctx, posX, posY, radius);
		ctx.strokeStyle= style;
		ctx.stroke();
		ctx.restore();		
	}
	
}


/**
*/
function buildNodeBackground()
{
	var logoGreen	= 0x8BC84B;
	var logoWhite	= 0xE0E0E0;

	var canvasEl	= document.createElement('canvas');
	canvasEl.width	= 1024;
	canvasEl.height	= 768;
console.log("canvas", canvasEl)
	
	var ctx		= canvasEl.getContext('2d');	
	document.body.appendChild(canvasEl);

	// erase the background	
	clearCanvas(ctx, "#e0e0e0");
	
(function(){
	var posX	= 300;
	var posY	= 300;
	var radius	= 80;

	canvasNode(ctx, posX, posY);
}());
	
}