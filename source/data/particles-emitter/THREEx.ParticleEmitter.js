var THREEx	= THREEx 		|| {};
THREEx.Particle	= THREEx.Particle	|| {};

THREEx.Particle.Emitter	= function(opts)
{
	this._items	= [];
	this._nbItems	= 5000;

	
	this._buildObject3d();
	this._createGeometry();
}

THREEx.Particle.Emitter.prototype._buildObject3d	= function()
{
	var geometry	= new THREE.Geometry();
	geometry.colors = [];
	
	var material	= new THREE.ParticleBasicMaterial({
		map		: THREE.ImageUtils.loadTexture( "images/lensFlare/Flare1.png" ),
		//map		: THREE.ImageUtils.loadTexture( "images/ball.png" ),

		vertexColors	: true,
		size		: 24,
		depthTest	: false,	
		blending	: THREE.AdditiveBlending,
		//blending	: THREE.SubtractiveBlending,
		//blending	: THREE.MultiplyBlending,
		transparent	: true
	});
	material.color.setRGB( 0.2, 1.0, 0.7 );
	
	this._particleSys	= new THREE.ParticleSystem( geometry, material );
}


THREEx.Particle.Emitter.prototype._createGeometry	= function()
{
	var geometry	= this._particleSys.geometry;
	
	for(var i = 0; i < this._nbItems; i++){
		var item	= new THREEx.Particle.item();

		this._items.push(item);

		geometry.vertices.push( new THREE.Vertex( item.position() ) );

		geometry.colors.push( new THREE.Color( 0xffffff ) );
	}
}

THREEx.Particle.Emitter.prototype.update	= function()
{
	var geometry	= this._particleSys.geometry;

	for(var i = 0; i < this._nbItems; i++){
		var item	= this._items[i];
		var vertex	= geometry.vertices[i];
		item.update();
		vertex.position.copy( item.position() );
	}

	geometry.__dirtyVertices = true;

	this._particleSys.updateMatrix();
}

THREEx.Particle.Emitter.prototype.object3d	= function()
{
	return this._particleSys;
}
