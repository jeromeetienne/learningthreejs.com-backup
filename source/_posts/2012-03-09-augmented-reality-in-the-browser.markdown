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
* It even include a part which explains how to bind it with three.js.
* I took this nice tutorial and packaged the code even easier to reuse.


Take this marker and put it in front on your webcam.
If you can, do so on a surface which
reflects light as opposed to projecting light.
Let me explain the difference.
TODO do it

{% img right /data/2012-03-09-augmented-reality-in-the-browser/images/marker-small.png %}

* print
[this marker](http://jeromeetienne.github.com/tquery.jsartoolkit/marker/marker.png)
on a paper, the same as you see on the right
* If you can't point your phone to
[this page](http://jeromeetienne.github.com/tquery.jsartoolkit/marker)


* [Try it out](http://jeromeetienne.github.com/tquery.jsartoolkit/)


## You Include it

You include it as usual in your page. Note that JSARToolKit is released under GPL,
so some restrictions apply. The threex is under MIT license as usual.

```html
    <script src="JSARToolKit.js"></script>
    <script src="threex.jsartoolkit.js"></script>
```

## You Initialize It

You instanciate the object like this.

```javascript
	var threexAR	= new THREEx.JSARToolKit({
		srcElement	: srcElement,
		threshold	: threshold,
		callback	: function(event){}
	});
```

The ```srcElement``` may be a
[video](http://en.wikipedia.org/wiki/HTML5_video), an
[image](http://www.w3.org/TR/html401/struct/objects.html#h-13.2)
or a
[canvas](http://www.w3.org/TR/html5/the-canvas-element.html).
To detect the augmented reality markers in it, just use this line.

```javascript
    threexAR.update();
```

Not rocket science here.

## You Use It

During ```.update()```, the callback is notified with events.
They describe the markers present on the srcElement. 
Each event got various fields:
A ```.markerId``` which tell you which marker has been recognized.
The
[one used above](http://jeromeetienne.github.com/tquery.jsartoolkit/marker)
is the *64*. You can find the whole list
[in JSARToolKit repository](https://github.com/kig/JSARToolKit/tree/master/demos/markers).

The ```.type``` field describe what is happening to this marker.
It may be *create*, *update* or *delete*.
*create* if the marker has just been detected,
*update* if the marker was present before.
and *delete* if the marker is no more present.
Rather obvious :)
The ```.matrix``` field is a
[THREE.Matrix4](https://github.com/mrdoob/three.js/blob/master/src/core/Matrix4.js).
It is a transform which matches the position of the marker in space.

## Conclusion

# meta
* explain what is augmented reality
  * what is a marker
  * the issue if you display it with projective light
* you publish a threex ???
  * should you publish it as tquery instead ?
  * likely
  * so code the tquery ?
* copy the demo in the blog data
  * thus it will keep running
