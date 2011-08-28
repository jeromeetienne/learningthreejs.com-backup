var THREEx	= THREEx 		|| {};
THREEx.Particle	= THREEx.Particle	|| {};

THREEx.Particle.item	= function(opts)
{
	this._params	= opts.params	|| console.assert(false);

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
	var angle	= randomRange( (90-90) * Math.PI/180, (90+90) * Math.PI/180);
	position.x	= Math.cos(angle);
	position.y	= Math.sin(angle);
	position.z	= 0;
	position.normalize().multiplyScalar( randomRange(0,1) );
})();

	this._deletedAt		= Date.now() + this._params.timeToLive;

	this._speedInc	= new THREE.Vector3(0, 0, 0);
	this._friction	= new THREE.Vector3(1.0, 1.0, 1.0);

	this._speed	= new THREE.Vector3();
	this._speed.copy(this._position).normalize();
	this._speed.normalize().multiplyScalar( randomRange(1, 3) );

	this._gravity		= new THREE.Vector3(0, -0.05, 0);	

	this._color		= new THREE.Color(0xFFaa00);

	this._rotation		= this._params.rotationSrc;
	this._rotationInc	= this._params.rotationInc;

	this._size		= this._params.sizeSrc;
	this._sizeInc		= this._params.sizeInc;

	this._opacity		= this._params.opacitySrc;
	this._opacityInc	= this._params.opacityInc;
}


THREEx.Particle.item.prototype.update	= function()
{
	if( Date.now() > this._deletedAt )	this._reset();
	
	this._speed	.addSelf( this._speedInc );
	this._speed	.addSelf( this._gravity );
	this._speed	.multiplySelf( this._friction );

	this._position	.addSelf( this._speed );
	
	this._size	+= this._sizeInc;
	this._rotation	+= this._rotationInc;
	this._opacity	+= this._opacityInc;
}


THREEx.Particle.item.prototype.position	= function()
{
	return this._position;
}

THREEx.Particle.item.prototype.rotation	= function()
{
	return this._rotation;
}

THREEx.Particle.item.prototype.size	= function()
{
	return this._size;
}

THREEx.Particle.item.prototype.color	= function()
{
	return this._color;
}
THREEx.Particle.item.prototype.opacity	= function()
{
	return this._opacity;
}