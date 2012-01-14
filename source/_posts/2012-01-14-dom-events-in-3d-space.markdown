---
layout: post
title: "Dom Events in 3D Space"
date: 2012-01-14 11:56
comments: true
categories: 
---

* this post present an experiment on pushing the concept of dom events
in 3D Space.
* three.js already had the ability to interact with the mouse.
* You can see it in action
[here](http://mrdoob.github.com/three.js/examples/webgl_interactive_cubes.html)
and
[here](http://mrdoob.github.com/three.js/examples/webgl_interactive_voxelpainter.html).


* Internally it uses
[THREE.Projector](https://github.com/mrdoob/three.js/blob/master/src/core/Projector.js)
and
[THREE.Ray](https://github.com/mrdoob/three.js/blob/master/src/core/Ray.js).

* We present an higher level api on top of those functions.
* something closer to the usual web developper
* an interface which mimic dom events

```javascript
    mesh.on('click', function()({
        mesh.scale.x *= 2;
    }))
```

What this line is doing ? It double scale.x when you click on the mesh.


# list of bound events
  * click
  * mouseup
  * mousedown
  * mouseenter
  * mouseleave


# Meta
* docco comment for both threex 