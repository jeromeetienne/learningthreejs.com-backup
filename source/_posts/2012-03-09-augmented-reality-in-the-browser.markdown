---
layout: post
title: "Augmented Reality in the Browser"
date: 2012-03-09 11:36
comments: true
categories: [threejs, augmentedreality]
---

This post is about augmented reality in the browser.
In a recent post, Recently we saw that it is now possible to
[have live video in webgl](/blog/2012/02/07/live-video-in-webgl/)
with
[WebRTC](http://www.webrtc.org/).
Due to this,
[augmented reality](http://en.wikipedia.org/wiki/Augmented_reality)
is under the spotlight. Recently
[html5rock](http://www.html5rocks.com/) published a
[tutorial](http://www.html5rocks.com/en/tutorials/webgl/jsartoolkit_webrtc/)
by
[ilmari heikkinen](http://www.html5rocks.com/en/profiles/#ilmari)
about "writting augmented reality application using jsartoolkit".
Ilmari is
[google devrel for webgl](https://plus.google.com/115293744081058969329/about)
and the author of
[JSARToolKit](http://github.com/kig/JSARToolKit) too. So we are in good hands :)
The tutorial even include a part which explains how to bind it with
[three.js](https://github.com/mrdoob/three.js/).
I took this nice tutorial and packaged the code even easier to reuse.


{% img right /data/2012-03-09-augmented-reality-in-the-browser/images/marker-small.png %}

If you got WebRTC is available in your browser, take
[this marker](http://jeromeetienne.github.com/tquery.jsartoolkit/marker/marker.png),
and put it in front on your webcam. 
It is the same you see on the right.
It is best to print it on paper.
If you can't point, your phone to
[this page](http://jeromeetienne.github.com/tquery.jsartoolkit/marker) instead.
Phones screen tends to reflect lights from your environment tho. They may
reduce the accuracy of the marker detection.

* [Try it out](http://jeromeetienne.github.com/tquery.jsartoolkit/)


## You Include it

You include it as usual in your page. The code is available
[here](https://github.com/jeromeetienne/tquery.jsartoolkit).
Note that JSARToolKit is released under GPL,
so some restrictions apply. The threex is under MIT license as usual.

```html
    <script src="JSARToolKit.js"></script>
    <script src="threex.jsartoolkit.js"></script>
```

## You Initialize It

Once you get the code, you instanciate the object like this.

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
To detect the augmented reality markers in it, just use this line in your
rendering loop.

```javascript
    threexAR.update();
```

No rocket science here.

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

So now we can do augmented reality in a browser.
Up to us to find actual application of this technology.
Currently most browsers with webcam are running on desktop/laptop tho.
It limits the flexibility of what you could put on front of the camera.
As for mobile, only opera 12 is currently the only mobile browser able
to read the webcam.

When the video is shoot in a uncontrolled environement,
the marker detection may be less reliable, due to the variation of lighting.



That's all folks. Have fun :)

# meta
* explain what is augmented reality
  * what is a marker
  * the issue if you display it with projective light
* you publish a threex ???
  * should you publish it as tquery instead ?
  * likely
  * so code the tquery ?
* rename the repo threex ?
* copy the demo in the blog data
  * thus it will keep running... issue with gpl
