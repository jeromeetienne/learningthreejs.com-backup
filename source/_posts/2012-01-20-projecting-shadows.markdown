---
layout: post
title: "&Projecting Shadows"
date: 2012-01-20 14:44
published: false
comments: true
categories: [three.js shadows]
---

* post about projecting shadows
* [demo](/data/projecting-shadows/)

## Code

* for renderer
* limited to [WebGLRenderer]()

```javascript
	renderer.shadowMapEnabled	= true;
	renderer.shadowMapSoft		= false;
```

* for objects

```javascript
	object3d.castShadow	= true;
	object3d.receiveShadow	= false;
```

* both default to false
* give meaning of those field
* Meta: cool screenshot from wikipedia ?
* link on background knowledge


* TODO local image of shadowMapSoft true/false
* ```THREE.DirectionalLight```

```javascript
	light.castShadow		= true;
	light.shadowDarkness		= 0.5;
```

* what about other light parameters
* which other light: spot light and no other
  * same parameters
  * ask on github for explaination to alteredq
* frustum of orthographic camera
* example from the recent r47 release.
  * (webgl_camera)[http://mrdoob.github.com/three.js/examples/webgl_camera.html]
  * it will show what is orthographic camera

```javascript
	light.shadowCameraRight		=  5;
	light.shadowCameraLeft		= -5;
	light.shadowCameraTop		=  5;
	light.shadowCameraBottom	= -5;
```


## META
* how to do projecting shadow
