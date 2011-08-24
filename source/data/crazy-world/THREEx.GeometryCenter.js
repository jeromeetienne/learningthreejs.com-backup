var THREEx		= THREEx || {};

THREEx.GeometryCenter	= {};

// TODO
// - add translate
// - add rotate
// - add scale
// - chained API
// - possibility a matrix to reduce computation ?
// - rename it to GeometryOperations

THREEx.GeometryCenter.center	= function(geometry, noX, noY, noZ)
{
	// make sure that geometry.boundingBox is uptodate
	geometry.computeBoundingBox();

	// compute delta
	var delta	= new THREE.Vector3()
	if( !noX )	delta.x	= -( geometry.boundingBox.x[ 1 ] + geometry.boundingBox.x[ 0 ] ) / 2;
	if( !noY )	delta.y	= -( geometry.boundingBox.y[ 1 ] + geometry.boundingBox.y[ 0 ] ) / 2;
	if( !noZ )	delta.z	= -( geometry.boundingBox.z[ 1 ] + geometry.boundingBox.z[ 0 ] ) / 2;

	return this.translate(geometry, delta)
}

THREEx.GeometryCenter.scale	= function(geometry, scale)
{
	// change all geometry.vertices
	for(var i = 0; i < geometry.vertices.length; i++) {
		var vertex	= geometry.vertices[i];
		vertex.position.multiplySelf(scale); 
	}

	// mark the vertices as dirty
	geometry.__dirtyVertices = true;

	// return this, to get chained API	
	return this;
}

THREEx.GeometryCenter.translate	= function(geometry, delta)
{
	// change all geometry.vertices
	for(var i = 0; i < geometry.vertices.length; i++) {
		var vertex	= geometry.vertices[i];
		vertex.position.addSelf(delta); 
	}

	// mark the vertices as dirty
	geometry.__dirtyVertices = true;

	// return this, to get chained API	
	return this;
}
