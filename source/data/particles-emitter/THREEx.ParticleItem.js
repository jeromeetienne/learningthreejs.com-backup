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

	//position.x	= Math.random()*2-1;
	//position.y	= Math.random()*2-1;
	//position.z	= Math.random()*2-1;
	position.normalize();
	//position.multiplyScalar( randomRange(0,0) );
	
(function(){
	var angle	= randomRange( (90-15) * Math.PI/180, (90+15) * Math.PI/180);
	position.x	= Math.cos(angle);
	position.y	= Math.sin(angle);
	position.z	= 0;
	position.normalize().multiplyScalar( randomRange(1,1) );
})();
	
	this._deletedAt		= Date.now() + 2000;

	this._acceleration	= new THREE.Vector3(0, 0, 0);
	this._friction		= new THREE.Vector3(1.0, 1.0, 1.0);

	this._speed		= new THREE.Vector3();
	this._speed.copy(this._position).normalize();
	//this._speed.y		= randomRange(3,3)
	//this._speed.x		= randomRange(-1, 1);
	//this._speed.y		= randomRange(0.4, .5);
	//this._speed.x		= randomRange(-1, 1);
	this._speed.normalize().multiplyScalar( randomRange(1, 3) );
	//this._speed.normalize().multiplyScalar( 3 );

	this._gravity		= new THREE.Vector3(0, -0.05, 0);	
}


THREEx.Particle.item.prototype.update	= function()
{
	if( Date.now() > this._deletedAt )	this._reset();
	
	this._speed	.addSelf( this._acceleration );
	this._speed	.addSelf( this._gravity );
	this._speed	.multiplySelf( this._friction );
	this._position	.addSelf( this._speed );
}

THREEx.Particle.item.prototype.position	= function()
{
	return this._position;
}
