/** @namespace */
var THREEx	= THREEx	|| {};

THREEx.LogoShape	= function()
{
	this._penX	= 0;
	this._penY	= 0;
	this._angle	= 0;
	this._penDown	= true;
	this._shape	= new THREE.Shape();
	
	this._needMoveTo= true;
}

THREEx.LogoShape.prototype.penUp	= function()
{
	this._penDown	= false;
	return this;
}

THREEx.LogoShape.prototype.penDown	= function()
{
	this._penDown	= true;
	this._needMoveTo= true;
	return this;
}

THREEx.LogoShape.prototype.turnRight	= function(rotation)
{
	this._angle	+= rotation;
	return this;
}

THREEx.LogoShape.prototype.turnLeft	= function(rotation)
{
	return this.turnRight(-rotation);
}

THREEx.LogoShape.prototype.forward	= function(distance)
{
	if( this._needMoveTo ){
		console.log("MoveTo pen x", this._penX, " y", this._penY)
		this._shape.moveTo( this._penX, this._penY );
		this._needMoveTo	= false;
	}

	this._penX	+= Math.cos(this._angle) * distance;
	this._penY	+= Math.sin(this._angle) * distance;

	if( this._penDown ){
		console.log("lineTo pen x", this._penX, " y", this._penY)
		this._shape.lineTo( this._penX, this._penY );
	}

	return this;
}

THREEx.LogoShape.prototype.shape	= function()
{
	return this._shape;
}
