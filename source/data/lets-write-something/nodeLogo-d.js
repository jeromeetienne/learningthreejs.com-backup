var NodeLogo	= NodeLogo	|| {};

NodeLogo.shapeD	= function(r)
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
	shape.lineTo(  Math.cos(a)*r, Math.sin(a)*r+1*r );
	a	+= ai;
	shape.lineTo(  Math.cos(a)*r+r/2, Math.sin(a)*r+1*r );
	shape.lineTo(  Math.cos(a)*r+r/2, Math.sin(a)*r-r/4 );
	
	// close the shape
	var a		= 90	* Math.PI/180;
	shape.lineTo(  Math.cos(a)*r	, Math.sin(a)*r );


	// get the hole
	// TODO to the hexagone in another function
	var r		= r/3;
	var a		= 90	* Math.PI/180;
	var ai		= 360/6 * Math.PI/180;
	var hole	= new THREE.Path();
	hole.moveTo(  Math.cos(a)*r, Math.sin(a)*r );
	a	+= ai;
	hole.lineTo(  Math.cos(a)*r, Math.sin(a)*r );
	a	+= ai;
	hole.lineTo(  Math.cos(a)*r, Math.sin(a)*r );
	a	+= ai;
	hole.lineTo(  Math.cos(a)*r, Math.sin(a)*r );
	a	+= ai;
	hole.lineTo(  Math.cos(a)*r, Math.sin(a)*r );
	a	+= ai;
	hole.lineTo(  Math.cos(a)*r, Math.sin(a)*r );
	a	+= ai;
	hole.lineTo(  Math.cos(a)*r, Math.sin(a)*r );
	shape.holes.push( hole );

	return shape;
}
