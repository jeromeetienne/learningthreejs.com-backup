---
layout: post
title: "a Short Update on tQuery"
date: 2012-02-15 10:21
comments: true
categories: [tquery, three.js]
---

The [tQuery](https://github.com/jeromeetienne/tquery) experimentation is going on.
It is a lot of fun to code :)
This post is just a short presentation of two plugins currently in incubation:
tquery.text and tquery.shape.
tQuery.text plugin writes text in 3D.
It is based on
[TextGeometry](https://github.com/mrdoob/three.js/blob/master/src/extras/geometries/TextGeometry.js).
Here is a simple example.

```javascript
    tQuery.createText("tQuery is Fun!").addTo(world);
```

{% img right  /data/short-update-on-tquery/images/shape.triangle-small.png	%}

tQuery shape is made easily build and
[extrude](http://en.wikipedia.org/wiki/Extrusion)
shapes in javascript.
It is based on
[THREE.Shape](https://github.com/mrdoob/three.js/blob/master/src/extras/core/Shape.js).
tquery.shape is cool because it uses a API very similar to
[canvas 2D](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#complex-shapes-\(paths\))
[path](https://developer.mozilla.org/en/Canvas_tutorial/Drawing_shapes).
This code will build a triangle.

```javascript
    var shape = tQuery.createShape().moveTo(80,20).lineTo(40,80)
                      .lineTo(120,80).lineTo(80,20);
    var geometry = shape.extrude();
```

{% img right /data/short-update-on-tquery/images/shape.fish-small.png	%}
{% img right /data/short-update-on-tquery/images/shape.heart-small.png	%}

Some shapes are already available, like the triangle above, or a fish, smiley
and a heart. Here is a heart.

```javascript
    var shape = tQuery.createHeartShape();
```


<center>
	<iframe width="425" height="349" src="http://www.youtube.com/embed/Aa7sHUE224A" frameborder="0" allowfullscreen></iframe>
</center>

<!-- more -->
