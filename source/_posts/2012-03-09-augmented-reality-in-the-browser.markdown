---
layout: post
title: "Augmented Reality in the Browser"
date: 2012-03-09 11:36
comments: true
categories: [threejs, augmentedreality]
---

* [JSARToolKit](html5rocks.com/en/tutorials/webgl/jsartoolkit_webrtc/)
and how to use it with
[WebRTC](http://www.webrtc.org/).
* [Try it out](http://jeromeetienne.github.com/tquery.jsartoolkit/)


```javascript
	var threexAR	= new THREEx.JSARToolKit({
		srcElement	: srcElement,
		threshold	: threshold,
		callback	: callback
	});
```

The ```srcElement``` may be a
[video](http://en.wikipedia.org/wiki/HTML5_video), an
[image](http://www.w3.org/TR/html401/struct/objects.html#h-13.2)
or a
[canvas](http://www.w3.org/TR/html5/the-canvas-element.html).
To detect the augmented reality markers in it, just use this line

```javascript
    threexAR.update();
```

During ```.update()```, the callback is notified with events.
They describe the markers present on the srcElement.

Each event got a ```.markerId```
The list of possible 

Each event got a ```.type```: create, update, delete



