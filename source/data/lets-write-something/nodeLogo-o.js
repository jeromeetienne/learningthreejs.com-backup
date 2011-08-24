var NodeLogo	= NodeLogo	|| {};

NodeLogo.shapeO	= function(r)
{
	var a		= 90	* Math.PI/180;
	var ai		= 360/6 * Math.PI/180;
	var shape	= new THREE.Shape();
	shape.moveTo(  Math.cos(a)*r, Math.sin(a)*r );
	a	+= ai;
	shape.lineTo(  Math.cos(a)*r, Math.sin(a)*r );
	a	+= ai;
	shape.lineTo(  Math.cos(a)*r, Math.sin(a)*r );
	a	+= ai;
	shape.lineTo(  Math.cos(a)*r, Math.sin(a)*r );
	a	+= ai;
	shape.lineTo(  Math.cos(a)*r, Math.sin(a)*r );
	a	+= ai;
	shape.lineTo(  Math.cos(a)*r, Math.sin(a)*r );
	a	+= ai;
	shape.lineTo(  Math.cos(a)*r, Math.sin(a)*r );
	
	return shape;
}
