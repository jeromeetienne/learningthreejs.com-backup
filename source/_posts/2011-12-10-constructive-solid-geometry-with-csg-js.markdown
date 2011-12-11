---
layout: post
title: "Contructive Solid Geometry With csg.js"
date: 2011-12-10 16:30
comments: true
categories: [three.js, library]
published: true
---

This post is about
[Constructive solid Geometry](http://en.wikipedia.org/wiki/Constructive_solid_geometry).

It is a way to build complex objects from simpler ones.
It uses [boolean operations](http://en.wikipedia.org/wiki/Algebra_of_sets) such as
union, difference and intersection.

a [helper](http://chandler.prallfamily.com/2011/12/constructive-solid-geometry-with-three-js/)
from
[Chandler Prall](http://chandler.prallfamily.com/)

[csg.js](http://evanw.github.com/csg.js/)
from
[Evan Wallas](http://madebyevan.com/)


<iframe src="http://127.0.0.1:4000/constructive-solid-geometry-with-csg-js/"
	width="420" height="315" frameborder="0" style="float: right; margin-left: 1em;">
</iframe>


##

Thus you can build new objects from javascript directly.
It may be usefull when you want dynamic modeling
or if like me, you dunno how to use a 3D modeler :)



## Lets get started

You get csg.js from
[here](http://evanw.github.com/csg.js/)
, Three.js glue from
[here](http://chandler.prallfamily.com/labs/three/csg/ThreeCSG.js)
and add those 2 lines.

```javascript
	<script src="csg.js"></script>
	<script src="ThreeCSG.js"></script>
```


