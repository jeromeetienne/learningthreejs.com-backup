var THREEx		= THREEx || {};

THREEx.GeometryUtils	= {};

// TODO
// - add translate
// - add rotate
// - add scale
// - chained API
// - possibility a matrix to reduce computation ?
// - rename it to GeometryUtils

THREEx.GeometryUtils.center	= function(geometry, noX, noY, noZ)
{
	// compute bounding box
	geometry.computeBoundingBox();

	// compute delta
	var delta	= this.middlePoint(geometry).negate();
	if( noX )	delta.x	= 0;
	if( noY )	delta.y	= 0;
	if( noZ )	delta.z	= 0;

	return this.translate(geometry, delta)
}

THREEx.GeometryUtils.middlePoint	= function(geometry)
{
	// compute bounding box
	geometry.computeBoundingBox();

	// compute middle
	var point	= new THREE.Vector3()
	point.x	= ( geometry.boundingBox.x[ 1 ] + geometry.boundingBox.x[ 0 ] ) / 2;
	point.y	= ( geometry.boundingBox.y[ 1 ] + geometry.boundingBox.y[ 0 ] ) / 2;
	point.z	= ( geometry.boundingBox.z[ 1 ] + geometry.boundingBox.z[ 0 ] ) / 2;

	return point;
}

THREEx.GeometryUtils.attachRightLeft	= function(geometry1, geometry2, delta)
{
	if( delta === undefined )	delta	= 0;
	// compute bounding box
	geometry1.computeBoundingBox();
	geometry2.computeBoundingBox();
	
	var maxX1	= geometry1.boundingBox.x[ 1 ]
	var minX2	= geometry2.boundingBox.x[ 0 ];

	var vector	= new THREE.Vector3();
	vector.x	= maxX1+ (-minX2) + delta;

	this.translate(geometry2, vector);
	
	return this;
}

THREEx.GeometryUtils.scale	= function(geometry, scale)
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

THREEx.GeometryUtils.translate	= function(geometry, delta)
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
