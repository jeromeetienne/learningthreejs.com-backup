

//////////////////////////////////////////////////////////////////////////////////
//		NodeLogoBackground						//
//////////////////////////////////////////////////////////////////////////////////

var NodeLogoBackground	= function(opts)
{
	this._ctx	= opts.ctx	|| console.assert(false, "canvas context CTX MUST be defined");
	this._nbNodes	= opts._nbNodes	!== undefined ? opts._nbNodes	: 10;

	this._width	= this._ctx.canvas.width;
	this._height	= this._ctx.canvas.height;
	
	// erase the background	
	this._clearCanvas("#e0e0e0");
		
	this._nodes	= [];
	for(var i = 0; i < this._nbNodes; i++){
		var node	= new NodeLogoBackground.Node({
			ctx	: this._ctx,
			radius	: 10+Math.random()*40,
			posX	: Math.random()*this._width,
			posY	: Math.random()*this._height
		})
		this._nodes.push(node);
		
		node.render();		
	}
}

NodeLogoBackground.prototype._clearCanvas	= function(fillStyle)
{
	var ctx		= this._ctx;
	fillStyle	= fillStyle	|| "#ffffff";
	ctx.save();
	ctx.fillStyle	= fillStyle;
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx.restore();	
}

//////////////////////////////////////////////////////////////////////////////////
//		NodeLogoBackground.Nodes					//
//////////////////////////////////////////////////////////////////////////////////

NodeLogoBackground.Node	= function(opts)
{
	this._ctx	= opts.ctx	|| console.assert(false, "canvas context CTX MUST be defined");
	this._posX	= opts.posX !== undefined	? opts.posX	: console.assert(false, "posX MUST be defined");	
	this._posY	= opts.posY !== undefined	? opts.posY	: console.assert(false, "posY MUST be defined");	
	this._radius	= opts.radius !== undefined	? opts.radius	: console.assert(false, "radius MUST be defined");
	

}

NodeLogoBackground.Node.prototype.render	= function()
{
	this._canvasNode(this._posX, this._posY, this._radius);
}

NodeLogoBackground.Node.prototype._canvasHexagone	= function(posX, posY, radius)
{
	var ctx		= this._ctx;
	var edgeLength	= radius * Math.sin(Math.PI/3);

	ctx.beginPath();
	// 
	ctx.translate(posX, posY);
	ctx.rotate(0.5 *Math.PI/3);

	// add each Edge
	var nbEdges	= 6;
	for(var i = 0; i < nbEdges; i++){
		ctx.lineTo(edgeLength,0);
		ctx.rotate(Math.PI / 3);
	}
	// close the path
	ctx.closePath();	
}

NodeLogoBackground.Node.prototype._canvasNode	= function(posX, posY, radius, style)
{
	var ctx	= this._ctx;
	// set default parameters
	radius	= radius !== undefined ? radius	: 30;
	style	= style	|| "#8BC84B";

	// build the filled one
	ctx.save();
	this._canvasHexagone(posX, posY, radius);
	ctx.fillStyle	= style;
	ctx.fill();
	ctx.restore();

	// build the stroke ones
	var nbBorders	= 3;	
	for(var i = 0; i < nbBorders; i++){
		radius	*= 1.5;
		ctx.save();
		this._canvasHexagone(posX, posY, radius);
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
	
	var logoBackground	= new NodeLogoBackground({
		ctx	: ctx
	});
}