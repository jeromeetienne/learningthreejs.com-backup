var NodeLogo	= NodeLogo	|| {};

NodeLogo.shapeE	= function(radius)
{
	var turtle	=  THREEx.LogoTurtle.create().turn(Math.PI/2).doHexagon(radius);
	var shape	= new THREE.Shape(turtle.points());

	var turtle	= THREEx.LogoTurtle.create().turn(Math.PI/2).doHexagon(radius/3);
	var hole	= new THREE.Path(turtle.points());
	shape.holes.push( hole );

	return shape;
}
