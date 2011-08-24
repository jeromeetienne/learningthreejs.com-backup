var NodeLogo	= NodeLogo	|| {};

NodeLogo.shapeN	= function(r)
{
	var rs		= 0.6	* r;
	var a		= 90	* Math.PI/180;
	var ai		= 360/6 * Math.PI/180;
	var shape	= new THREE.Shape();
	
	shape.moveTo(  Math.cos(a)*r	, Math.sin(a)*r );
	a	+= ai;

	// left side
	shape.lineTo(  Math.cos(a)*r	, Math.sin(a)*r );
	a	+= ai;

	shape.lineTo(  Math.cos(a)*r	, Math.sin(a)*r );

	shape.lineTo(  Math.cos(a)*rs	, Math.sin(a)*rs );
	a	-= ai;

	shape.lineTo(  Math.cos(a)*rs	, Math.sin(a)*rs );
	a	-= ai;

	shape.lineTo(  Math.cos(a)*rs	, Math.sin(a)*rs );
	a	-= ai;
	
	// right side

	shape.lineTo(  Math.cos(a)*rs	, Math.sin(a)*rs );
	a	-= ai;

	shape.lineTo(  Math.cos(a)*rs	, Math.sin(a)*rs );

	shape.lineTo(  Math.cos(a)*r	, Math.sin(a)*r );
	a	+= ai;

	shape.lineTo(  Math.cos(a)*r	, Math.sin(a)*r );

	// close the shape
	var a		= 90	* Math.PI/180;
	shape.lineTo(  Math.cos(a)*r	, Math.sin(a)*r );
	
	return shape;
}

