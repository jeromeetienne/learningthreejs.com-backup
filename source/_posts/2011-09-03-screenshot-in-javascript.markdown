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

Notice the option ```preserveDrawingBuffer``` ? It is ```WebGLRenderer``` specific.
This is required to support ```.toDataURL()``` as explained in the [spec](http://www.khronos.org/registry/webgl/specs/latest/#2.2).
Other [renderers](https://github.com/mrdoob/three.js/tree/master/src/renderers) dont need it.

```javascript
	var dataUrl = renderer.domElement.toDataURL(mimetype);
```

## THREEx helper to make it even simpler

I wrote [THREEx.screenshot](/data/THREEx/THREEx.screenshot.js), a THREEx helper to
automatize the process and makes it as simple as possible.
You download it from [here](/data/THREEx/THREEx.screenshot.js) and include
it in your page like this

```html
	<script type="text/javascript" src="THREEx.screenshot.js"></script>
```

Would it be cool if got your own [printscreen](http://en.wikipedia.org/wiki/Print_screen)
key for your 3D ? The following line will do exactly that.
Everytime you press *p*, it does a screenshot of the renderer, and open a window containing it.

```javascript
	THREEx.Screenshot.bindKey(renderer);
```


Note the [aspect](http://en.wikipedia.org/wiki/Aspect_ratio_(image\)) of the original image is preserved.
The default callback behavior is to open a window containing the screenshot, so be carefull it may be
stopped by popup blockers.

It is possible to customize the default behaviors thru options.
For more details, see the [annoted source](/data/THREEx/docs/THREEx.screenshot.html) of 
[THREEx.screenshot](/data/THREEx/THREEx.screenshot.js).
