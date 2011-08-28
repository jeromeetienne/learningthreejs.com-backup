var THREEx	= THREEx 		|| {};
THREEx.Particle	= THREEx.Particle	|| {};

THREEx.Particle.item	= function(opts)
{
	this._reset();
}

THREEx.Particle.item.prototype._reset	= function()
{
	function randomRange(min, max) {
		return min + Math.random()*(max-min); 
	}

	this._position	= new THREE.Vector3( 0,0,0 );
	var position	= this._position;

	position.x	= Math.random()*2-1;
	//position.y	= Math.random()*2-1;
	position.z	= Math.random()*2-1;
	position.normalize();
	//position.multiplyScalar( randomRange(0,0) );
	
	var timeToLive	= 2*1000;
	this._deletedAt	= Date.now() + timeToLive;

	this._speedInc	= new THREE.Vector3(0.05, 0, 0);

	this._speed	= new THREE.Vector3();
	this._speed.copy(this._position).normalize();
	this._speed.normalize().multiplyScalar( randomRange(1, 5) );

	this._gravity	= new THREE.Vector3(0, -0.05, 0);
	this._gravity	= new THREE.Vector3(0, 0, 0);	
}


THREEx.Particle.item.prototype.update	= function()
{
	if( Date.now() > this._deletedAt )	this._reset();
	
	this._speed	.addSelf( this._speedInc );
	this._speed	.addSelf( this._gravity );
	this._position	.addSelf( this._speed );
}

THREEx.Particle.item.prototype.position	= function()
{
	return this._position;
}
