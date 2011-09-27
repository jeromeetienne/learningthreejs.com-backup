var Player	= function(){

	this.radius	= 200;
	
	this.speedX	= 0;
	this.speedY	= 0;
	this.speedZ	= 0;

	this.damping	= 0.95;

	this._buildMesh();
}

Player.prototype._buildMesh	= function()
{
	var material	= new THREE.MeshLambertMaterial( { color: 0xffffff, map: THREE.ImageUtils.loadTexture( "images/moon_1024.jpg" ) } );
	var geometry	= new THREE.SphereGeometry( this.radius, 40, 20 );
	this.mesh	= new THREE.Mesh( geometry, material );

	this.mesh.matrixAutoUpdate = false;
	this.mesh.updateMatrix();
}


Player.prototype._controlKeyboard	= function()
{
	var key		= {
		left	: keyboard.pressed('A') || keyboard.pressed('J') || keyboard.pressed('left') 	|| keyboard.pressed('Q') ,
		right	: keyboard.pressed('D') || keyboard.pressed('L') || keyboard.pressed('right'),
		up	: keyboard.pressed('W') || keyboard.pressed('I') || keyboard.pressed('up')	 || keyboard.pressed('Z') ,
		down	: keyboard.pressed('S') || keyboard.pressed('K') || keyboard.pressed('down')
	};

	var acceleration= 0.5;
	if( key.left )	this.speedX	-= acceleration;
	if( key.right )	this.speedX	+= acceleration;
	if( key.up )	this.speedZ	-= acceleration;
	if( key.down )	this.speedZ	+= acceleration;	
}

Player.prototype._controlDevOrientation	= function()
{
	var maxAngleX	= 25 * Math.PI/180;
	var epsilonX	=  2 * Math.PI/180;
	var maxAccelX	= 0.5;
	var angleX	= devOrientation.angleX();	
	angleX		= Math.min(+maxAngleX, angleX);
	angleX		= Math.max(-maxAngleX, angleX);
	angleX		= Math.abs(angleX) < epsilonX ? 0 : angleX;
	this.speedZ	+= maxAccelX * angleX / maxAngleX;


	var maxAngleZ	= 25 * Math.PI/180;
	var epsilonZ	=  2 * Math.PI/180;
	var maxAccelZ	= 0.5;
	var angleZ	= devOrientation.angleZ();	
	angleZ		= Math.min(+maxAngleZ, angleZ);
	angleZ		= Math.max(-maxAngleZ, angleZ);
	angleZ		= Math.abs(angleZ) < epsilonZ ? 0 : angleZ;
	this.speedX	+= maxAccelZ * angleZ / maxAngleZ;
}

Player.prototype.update	= function()
{
	this._controlDevOrientation();
	this._controlKeyboard();

	// handle damping
	this.speedX	*= this.damping;
	this.speedY	*= this.damping;
	this.speedZ	*= this.damping;

	// compute rotations
	var perimeter	= 2 * Math.PI * this.radius;
	var rotationZ	= - 4 * this.speedX / perimeter;
	var rotationX	= + 4 * this.speedZ / perimeter;
	
	// solution to get rolling marble from |3d| on freenode
	var matrix	= new THREE.Matrix4();
	matrix.multiplySelf(new THREE.Matrix4().setRotationX(rotationX));
	matrix.multiplySelf(new THREE.Matrix4().setRotationZ(rotationZ));
	this.mesh.matrix.copy(matrix.multiplySelf( this.mesh.matrix));

	this.mesh.update(false, true, camera);
}

