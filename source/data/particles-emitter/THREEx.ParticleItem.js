var THREEx	= THREEx 		|| {};
THREEx.Particle	= THREEx.Particle	|| {};

THREEx.Particle.item	= function(opts)
{
	this._params	= opts.params	|| console.assert(false);

	this.reset();
	this._kill();
}

THREEx.Particle.item.prototype.reset	= function()
{
	this._deleteIn	= 2000;

	this._position	= new THREE.Vector3( 0,0,0 );

	this._speed	= new THREE.Vector3();
	this._speed.copy(this._position).normalize().multiplyScalar( 2 );
	this._speedInc	= new THREE.Vector3(0, -0.05, 0);
	this._speedMul	= new THREE.Vector3(1.0, 1.0, 1.0);

	this._color	= new THREE.Color(0xFFFFFF);

	this._rotation	= 0*Math.PI/180;
	this._rotationInc = 0;

	this._size	= 16;
	this._sizeInc	= 0;

	this._opacity	= 1.0;
	this._opacityInc= 0;
	
	return this;
}

THREEx.Particle.item.prototype.start	= function(params)
{
	Object.keys(params).forEach(function(param){
		console.assert( this['_'+param] !== undefined, 'param '+param+' isnt defined' );
		this['_'+param]	= params[param];
	}.bind(this));
}

THREEx.Particle.item.prototype.emit	= function(opts)
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
	var angle	= randomRange( (90-30) * Math.PI/180, (90+30) * Math.PI/180);
	position.x	= Math.cos(angle);
	position.y	= Math.sin(angle);
	position.z	= 0;
	position.normalize().multiplyScalar( randomRange(0,1) );
})();

	this._deleteIn	= this._params.timeToLive;


	this._speed	= new THREE.Vector3();
	this._speed.copy(this._position).normalize();
	//this._speed.normalize().multiplyScalar( randomRange(1, 2) );
	this._speed.normalize().multiplyScalar( randomRange(1, 2) );

	this._speedInc	= new THREE.Vector3(0, 0, 0);
	this._speedMul	= new THREE.Vector3(1.0, 1.0, 1.0);
	this._speedInc.addSelf(new THREE.Vector3(0, -0.05, 0));

	this._color		= new THREE.Color(0xFF5510);

	this._rotation		= this._params.rotationSrc;
	this._rotationInc	= this._params.rotationInc;

	this._size		= this._params.sizeSrc;
	this._sizeInc		= this._params.sizeInc;

	this._opacity		= this._params.opacitySrc;
	this._opacityInc	= this._params.opacityInc;
}

THREEx.Particle.item.prototype.isUnvisible	= function()
{
	return this._opacity === 0.0;
}

THREEx.Particle.item.prototype._kill	= function()
{
	this._opacity	= 0.0;
}


THREEx.Particle.item.prototype.update	= function(deltaTime)
{
	if( this._deleteIn > 0 ){
		this._deleteIn	-= deltaTime;
		if( this._deleteIn <= 0 )	this._kill();
	}
	if( this.isUnvisible() ) return;
	
	
	this._speed	.multiplySelf( this._speedMul );
	this._speed	.addSelf( this._speedInc );

	this._position	.addSelf( this._speed );
	
	this._size	+= this._sizeInc;

	this._rotation	+= this._rotationInc;
	
	this._opacity	+= this._opacityInc;
	this._opacity	= Math.max(this._opacity, 0.0);
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