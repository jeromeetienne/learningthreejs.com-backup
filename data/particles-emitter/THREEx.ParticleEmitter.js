var THREEx	= THREEx 		|| {};
THREEx.Particle	= THREEx.Particle	|| {};

THREEx.Particle.Emitter	= function(opts)
{
	this._params	= opts.params	|| console.assert(false);

	this._items	= [];
	this._nbItems	= 10000;

	this._buildObject3d();
	this._createGeometry();
}

THREEx.Particle.Emitter.prototype._buildMaterialShader	= function()
{
	var attributes = {
		aRotation	: { type: 'f', value: [] },
		aSize		: { type: 'f', value: [] },
		aColor		: { type: 'c', value: [] },
		aOpacity	: { type: 'f', value: [] }
	};

	var uniforms = {
		color		: { type: "c", value: new THREE.Color( 0xFFFFFF ) },
		texture		: { type: "t", value: 0, texture: THREE.ImageUtils.loadTexture( "images/lensFlare/Flare1.png" ) }
		//texture		: { type: "t", value: 0, texture: THREE.ImageUtils.loadTexture( "images/ball.png" ) }
		//texture		: { type: "t", texture: THREE.ImageUtils.loadTexture( "images/lensFlare/Shine1.png" ) }
	};

	var material = new THREE.MeshShaderMaterial({
		uniforms	: uniforms,
		attributes	: attributes,
		vertexShader	: document.getElementById( 'vertexshader' ).textContent,
		fragmentShader	: document.getElementById( 'fragmentshader' ).textContent,

		blending	: THREE.AdditiveBlending,
		depthTest	: false,
		transparent	: true
	});

	for(var i = 0; i < this._nbItems; i++ ){
		attributes.aSize	.value[i]	= 8;
		attributes.aRotation	.value[i]	= 0;
		attributes.aColor	.value[i]	= new THREE.Color( 0x000000 );
		attributes.aOpacity	.value[i]	= 1.0;
	}
	return material;
}

THREEx.Particle.Emitter.prototype._buildObject3d	= function()
{
	var geometry	= new THREE.Geometry();
	var material	= this._buildMaterialShader();	
	this._particleSys	= new THREE.ParticleSystem( geometry, material );
}

THREEx.Particle.Emitter.prototype._createGeometry	= function()
{
	var geometry	= this._particleSys.geometry;	
	for(var i = 0; i < this._nbItems; i++){
		var item	= new THREEx.Particle.item({
			params	: this._params
		});
		this._items.push(item);
		geometry.vertices.push( new THREE.Vertex( item.position() ) );
	}
}

THREEx.Particle.Emitter.prototype.update	= function()
{
	var geometry	= this._particleSys.geometry;
	var material	= this._particleSys.materials[0];
	var attributes	= material.attributes;

	// emit particle if needed
	for(var i = 0, nbEmitted = 0; i < this._nbItems && nbEmitted !== this._params.emitRate; i++){
		var item	= this._items[i];
		if( item.isUnvisible() === false )	continue;
		item.reset();
		nbEmitted++;
	}
	
	for(var i = 0; i < this._nbItems; i++){
		var item	= this._items[i];
		item.update();

		var vertex	= geometry.vertices[i];
		vertex.position.copy( item.position() );

		// update the attributes
		attributes.aSize	.value[i]	= item.size();
		attributes.aRotation	.value[i]	= item.rotation();
		attributes.aColor	.value[i]	= item.color();
		attributes.aOpacity	.value[i]	= item.opacity();
	}

	// mark the attributes as dirty
	attributes.aSize	.needsUpdate	= true;
	attributes.aRotation	.needsUpdate	= true;
	attributes.aColor	.needsUpdate	= true;
	attributes.aOpacity	.needsUpdate	= true;

	// mark geometry as dirty
	geometry.__dirtyVertices = true;
}

THREEx.Particle.Emitter.prototype.object3d	= function()
{
	return this._particleSys;
}
