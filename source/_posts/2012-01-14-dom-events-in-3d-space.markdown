---
layout: post
title: "Dom Events in 3D Space"
date: 2012-01-14 11:56
comments: true
categories: 
---

* this post present an experiment on pushing the concept of dom events
in 3D Space.
* We all know the click event trigger when the user click on a webpage.
* wouldn't it be great to have that but in a 3D page ?
* In a web page, a
[click](http://www.quirksmode.org/dom/events/click.html)
event is trigger when a user click on a element.
* This is common knowledge in webdev.
* To have that but in a three.js scene ? how great would that be!!
* So let's do that.

* Maybe people will start do 3D user interface with that, who know :)

* We all know the click event trigger when the user click on a webpage.
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
* an interface which mimic dom events.

* so we need to function to bind and unbind events
* There is 2 naming for those functions:
one is
[addEventListener](https://developer.mozilla.org/en/DOM/element.addEventListener)
/
[removeEventListener](https://developer.mozilla.org/en/DOM/element.removeEventListener)
from
[HTMLElement](http://www.whatwg.org/specs/web-apps/current-work/multipage/semantics.html)
the other is
[on](http://api.jquery.com/on/)
/
[off](http://api.jquery.com/off/)
from
[jQuery](http://jquery.com/).
Pick the one you like. They are doing the same thing.

```javascript
    mesh.on('click', function()({
        mesh.scale.x *= 2;
    }))
```

What this line is doing ? It double scale.x when you click on the mesh.

If you wish to stop listening just do
as usual.

```javascript
	mesh.off('click', callback)
```

For more details on
[threex.domevent.object3d.js](https://github.com/jeromeetienne/threex/blob/master/threex.domevent.object3d.js),
see its [annoted source](http://jeromeetienne.github.com/threex/docs/threex.domevent.object3d.html).

It is a nice api. clean, short, object oriented and feel usual to web developpers.

clean a
You could ask: 
yeah but
[threex.domevent.object3d.js](https://github.com/jeromeetienne/threex/blob/master/threex.domevent.object3d.js)
modifies
[THREE.Object3D]
class globally, it isnt too clean ?
Well 

For more details on
[threex.domevent.js](https://github.com/jeromeetienne/threex/blob/master/threex.domevent.js),
see its [annoted source](http://jeromeetienne.github.com/threex/docs/threex.domevent.html).



# list of bound events
* Always in a effort to stay close to usual pratices, the events name are the same as in DOM.
* i kept the event semantic 

  * click
  * mouseup
  * mousedown
  * mouseenter
  * mouseleave
  


# Meta
* docco comment for both threex
