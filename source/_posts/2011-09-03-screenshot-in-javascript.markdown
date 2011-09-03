---
layout: post
title: "How to Do a Screenshot in Javascript"
date: 2011-09-03 10:01
comments: true
categories: [basics, three.js, THREEx]
---

Suppose you got 3D scene in [three.js](http://google.com), and you would like to make a screenshot
of it. 

```javascript
	var renderer	= new THREE.WebGLRenderer({
		preserveDrawingBuffer	: true	// required to support .toDataURL()
	});
```

Notice the option ```preserveDrawingBuffer``` ? It is required to support ```.toDataURL()```
as explained in [WebGL spec](http://www.khronos.org/registry/webgl/specs/latest/#2.2).
Other [renderers](https://github.com/mrdoob/three.js/tree/master/src/renderers) dont need it.

```javascript
	var dataUrl = renderer.domElement.toDataURL(mimetype);
```

## THREEx helper to make it even simpler

I created [THREEx.screenshot](/data/THREEx/THREEx.screenshot.js), a THREEx helper to
automatize the process and makes it as simple as possible.

You download it from [here](/data/THREEx/THREEx.screenshot.js) and include
it in your page like this

```html
	<script type="text/javascript" src="THREEx.screenshot.js"></script>
```

```javascript
	THREEx.Screenshot.bindKey(renderer);
```

## Conclusion
For more details, see the [annoted source](/data/THREEx/docs/THREEx.screenshot.html) of 
[THREEx.screenshot](/data/THREEx/THREEx.screenshot.js).
