---
layout: post
title: "Casting Shadows"
date: 2012-01-20 14:44
published: false
comments: true
categories: [three.js shadows]
---

* post about casting shadows

## Code

* Casting shadows involves 3 part in
[three.js](https://github.com/mrdoob/three.js/).
* the
[renderer](https://github.com/mrdoob/three.js/blob/master/src/renderers/WebGLRenderer.js)
which will do the computation,
* you define which light will cast shaddows and how,
* then you specify which object will cast or receive shadows.


## Renderer

{% img right /data/casting-shadows/images/screenshot-withsoftshadow.png %}
{% img right /data/casting-shadows/images/screenshot-nosoftshadow.png %}

* The renderer is the one which will compute the shadows positions for your 3D scene.
* Currently casting shadows is limited to
[WebGLRenderer](https://github.com/mrdoob/three.js/blob/master/src/renderers/WebGLRenderer.js).
* 

```javascript
	renderer.shadowMapEnabled = true;
	renderer.shadowMapSoft = false;	// to antialias the shadow or not
```


## Objects3D

```javascript
	object3d.castShadow	= true;
	object3d.receiveShadow	= false;
```

* both default to false
* give meaning of those field
* Meta: cool screenshot from wikipedia ?
* link on background knowledge

## Lights
* (THREE.DirectionalLight)[https://github.com/mrdoob/three.js/blob/master/src/lights/DirectionalLight.js]
or
(THREE.SpotLight)[https://github.com/mrdoob/three.js/blob/master/src/lights/SpotLight.js]
are able to cast shadows. Just use this line to enable it.

```javascript
	light.castShadow		= true;
```

```javascript
	light.shadowDarkness		= 0.5;
```



* It possible to show the shadow camera on the screen with.
```light.shadowCameraVisible = true;```.
A very usefull feature during tuning or debugging.

* what about other light parameters
* which other light: spot light and no other
  * same parameters
  * ask on github for explaination to alteredq
* frustum of orthographic camera
* (Perspective)[http://en.wikipedia.org/wiki/Perspective_(graphical)]
is the way we see things in real life.
So it seems more natural to us than
(orthographic projection)[http://en.wikipedia.org/wiki/Orthographic_projection].
* Recent
(three.js r47 release)[https://github.com/mrdoob/three.js/commit/32b581f24fddeaf9e91b7825aa93ec0ad3a45c83]
includes a
(very didactic example](http://mrdoob.github.com/three.js/examples/webgl_camera.html)
from
(alteredq)[http://alteredqualia.com/].
* Play with it, it will helps understand the difference between
(orthographic)[https://github.com/mrdoob/three.js/blob/master/src/cameras/OrthographicCamera.js]
and
(perspective)[https://github.com/mrdoob/three.js/blob/master/src/cameras/PerspectiveCamera.js]
cameras.

```javascript
	light.shadowCameraRight		=  5;
	light.shadowCameraLeft		= -5;
	light.shadowCameraTop		=  5;
	light.shadowCameraBottom	= -5;
```

# Conclusion


## META
* how to do casting shadow
* explain the code
* get a simple demo

* [demo](/data/casting-shadows/)
* [shadow casting](http://en.wikipedia.org/wiki/Shadow_mapping)


<iframe src="/data/casting-shadows"
	webkitallowfullscreen mozallowfullscreen allowfullscreen 
	width="420" height="315" frameborder="0" style="float: right; margin-left: 1em;">
</iframe>

* from [wikipedia](http://en.wikipedia.org/wiki/File:7fin.png)
{% img /data/casting-shadows/images/wikipedia-withshadow.png %}
