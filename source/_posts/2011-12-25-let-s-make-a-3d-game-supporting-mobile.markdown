---
layout: post
title: "Let’s Make a 3D Game: Supporting Mobile ?"
date: 2011-12-25 13:46
comments: true
categories: 
---

* this post is about supporting mobile ?

* When doing a
[boilerplate for three.js](http://127.0.0.1:8000/blog/2011/12/20/boilerplate-for-three-js/),
mobile had to be supported for compatibility.
So it gave me the idea of this post.
What about porting our game,
[marblesoccer](http://marblesoccer.com) on mobile ? crazy :)

* The desktop version looks kindof ok.
What would be the result of this experiment ?
Is that even possible ?
What about usable ?

* This is the purpose of this experiment to find out.

## Mobile isn't desktop

Indeed... desktop and mobile are quite different plateforms.
Which differences are relevant to us ?
First, mobile network is bad, especially latency.
So avoid download of long files, such as texture or sound.
Here is a good talk on
[Mobile Web Performance](http://www.youtube.com/watch?v=L2YqfVNHQO4).
Another thing, mobile got no keyboard, no mouse, but a touch screen
We need to get a game controller for this environement.
We will do a [virtual joystick](http://www.youtube.com/watch?v=-sEJ4Lo0cm8)
and explain it in a later post.

One big thing is that currently, on mobile, WebGL hasnt reached mainstream to say the least.
No major vendor is shipping phone with webgl, so nobody or close get webgl on phone.
So for our little experiment, we will display in
[Canvas 2D](http://www.w3.org/TR/2010/WD-2dcontext-20100304/)
with
[THREE.CanvasRenderer](https://github.com/mrdoob/three.js/blob/master/src/renderers/CanvasRenderer.js).

## Porting to canvas 2D

* what need to be done
* first step is the renderer
* second is fixing material
* last step is optimisations.

* if no webgl, fallback on canvas2D
  * like done in threejsboilerplate
  * past the code to do it here.

* material
  * what was before
  * what did you put ?
  * and why

* So it results in 3fps on my ipad2 ios4... ouch.


## Time to optimize

Ok it is slow but this is a first try.
I admit the code isnt not too optimized.
desktop cpu and gpu performance are so good, i may have been sloppy here and there :)
There are areas of optimisations.
We need to draw less polygons.

First we need to *reduce the geometry* of the map.
We can do that by clustering voxels:
if 2 voxels got the same color and touch each other, display one large box, instead of 2 small boxes.
We did it to optimize our physics.
See details in [microphysics post](/blog/2011/10/17/lets-make-a-3d-game-microphysics-js/).
Additionnaly we could use marblesoccer's
[map editor](http://127.0.0.1:8000/blog/2011/09/14/lets-make-a-3D-game-map-editor/)
to redesign a map with a simpler geometry.

Another low-hanging fruit is to remove faces which are never seen, like in
[minecraft example](http://mrdoob.github.com/three.js/examples/webgl_geometry_minecraft_ao.html)
from
[three.js](https://github.com/mrdoob/three.js/).
We could try to 2D sprites instead of 3D spheres for marble.
We wont use
[THREE.Sprite](https://github.com/mrdoob/three.js/blob/master/src/objects/Sprite.js).
It isnt supported
[THREE.CanvasRenderer](https://github.com/mrdoob/three.js/blob/master/src/renderers/CanvasRenderer.js).
But dont worry, it is possible with the particle system.
See how ```THREE.Particle``` is used in
[canvas_particles_sprites.html](http://mrdoob.github.com/three.js/examples/canvas_particles_sprites.html)
example.

## Conclusion
And after all that, what can you expect ?
Will that run at 60fps ? 30fps ? Not likely or it will require a lot of effort.
{% img left /data/lets-make-a-3d-game-supporting-mobile/images/screenshot-webgl-small.png  %}
{% img right /data/lets-make-a-3d-game-supporting-mobile/images/screenshot-canvas-small.png  %}
So animations arent smooth, what about the look?
Watch what you got on the screen...
On the right, a canvas version. [live here](http://marblesoccer.com/?render=canvas).
On the left you can see a webgl version. [live here](http://marblesoccer.com).
Lets face it... *canvas version is ugly*.

After a significant work, you get poor performance and crappy look.
Not many players would accept that...
currently canvas performance doesnt seems suitable to display 3D on mobile.
It is a good way to monitor performances and see how they evolve with time.

