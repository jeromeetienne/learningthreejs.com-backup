var NodeLogo	= NodeLogo	|| {};

NodeLogo.shapeE	= function(r)
{
	var logo	= new THREEx.LogoShape()
		.forward(100)
		.turnRight(Math.PI/2)
		.forward(100)
		.turnRight(Math.PI/2)
		.forward(100)
		.turnRight(Math.PI/2)
		.forward(100);
	
	return logo.shape();
}
