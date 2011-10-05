---
layout: post
title: "Performance: Merging Geometry"
date: 2011-10-05 11:29
comments: true
categories: [three.js, performance]
---

This article is about performance and how merging geometry can improve them.
In WebGL, it is important to reduce the [gl](http://www.khronos.org/registry/webgl/specs/latest/)
calls as much as possible.
As always, the rules of thumbs is *the less data are exchanged between the cpu and
the gpu, the better it is for performance*.


To measure the performance, the [demo](/data/performance-merging-geometry/) is rendering random cubes.
My computer is able to display 2000 cubes at 30fps if the geometries arent merged.
But if the geometry are merged, it displays *120000* cubes at 30fps.
This is **60 times** more cubes.
Far from negligable!


# An example

The [demo](/data/performance-merging-geometry/) is directly derived from a [three.js example](http://mrdoob.github.com/three.js/examples/webgl_geometry_hierarchy.html).
I just added controls to let the user play various parameters.


## 101 on geometry

A geometry is the shape of the 3D object. three.js got already
[several predefined](https://github.com/mrdoob/three.js/tree/master/src/extras/geometries) for you.
[Plane](https://github.com/mrdoob/three.js/blob/master/src/extras/geometries/PlaneGeometry.js),
[CubeGeometry](https://github.com/mrdoob/three.js/blob/master/src/extras/geometries/CubeGeometry.js) or
[Sphere](https://github.com/mrdoob/three.js/blob/master/src/extras/geometries/SphereGeometry.js)
are the common ones.

## prout 
This post is about merging them. The call to use is
in [THREE.Geometry](https://github.com/mrdoob/three.js/blob/master/src/extras/GeometryUtils.js).
This line will merge ```otherGeometry``` into ```geometry```.

```javascript
    THREE.GeometryUtils.merge(geometry, otherGeometry);
```

In fact, it will more concatenate the 2 ```THREE.Geometry``` than actually merge them.
No duplicate is removed in the process.

## merging geometry with mesh

Usefull for ```mesh.position```

usefull for material, ```new THREE.MeshFaceMaterial()```

explain with other geometry and mesh

