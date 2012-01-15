---
layout: post
title: "Dom Events in 3D Space"
date: 2012-01-14 11:56
comments: true
categories: [threejs, exeperiment]
---

This post presents an experiment which implements the concept of dom events
in 3D Space.
In a web page, a
[click](http://www.quirksmode.org/dom/events/click.html)
event is trigger when a user click on a element.
This is common knowledge in web development.
What about having that but in a three.js scene ?
Maybe people will start do 3D user interface with that, who know.
how great would that be!!
So let's do that.

[Try it out](http://jeromeetienne.github.com/threex/examples/threex.domevent/).
The demo contains 3 teapots.
Each bind a different type of events.
When the events are trigger, teapots are animated.
Animations are made by [tween.js](https://github.com/sole/tween.js/), a nice js tweening engine
seen in a [previous post](/blog/2011/08/17/tweenjs-for-smooth-animation/).
Play with it to get a feel of it, maybe think about the type of UI you could do in 3D.

<center>
	<iframe width="425" height="349" src="http://www.youtube.com/embed/Ow_ceac1aEE?hl=en&fs=1" frameborder="0" allowfullscreen></iframe>
</center>

<!-- more -->

## let's get started

[three.js](https://github.com/mrdoob/three.js/)
already has the ability to interact with the mouse.
You can see it in action
[here](http://mrdoob.github.com/three.js/examples/webgl_interactive_cubes.html)
and
[here](http://mrdoob.github.com/three.js/examples/webgl_interactive_voxelpainter.html).
Internally they use 2 three.js classes:
[THREE.Projector](https://github.com/mrdoob/three.js/blob/master/src/core/Projector.js)
and
[THREE.Ray](https://github.com/mrdoob/three.js/blob/master/src/core/Ray.js).
[threex.domevent.js](https://github.com/jeromeetienne/threex/blob/master/threex.domevent.js)
is an higher level api on top of those functions,
an interface which mimic dom events,
something closer to the usual web developper.

First let's include the source.
You download [threex.domevent.js](https://github.com/jeromeetienne/threex/blob/master/threex.domevent.js).
and copy this line in your page.

```html
	<script src='threex.domevent.js'></script>
```

## let's use it

<iframe src="http://jeromeetienne.github.com/threex/examples/threex.domevent"
	webkitallowfullscreen mozallowfullscreen allowfullscreen 
	width="420" height="315" frameborder="0" style="float: right; margin-left: 1em;">
</iframe>

* So we need to function to bind and unbind events
* There is 2 naming for those functions:
one is
[addEventListener](https://developer.mozilla.org/en/DOM/element.addEventListener)
/
[removeEventListener](https://developer.mozilla.org/en/DOM/element.removeEventListener)
from
[HTMLElement](http://www.whatwg.org/specs/web-apps/current-work/multipage/semantics.html)
The other is copied on
[jQuery](http://jquery.com/) api:
[on](http://api.jquery.com/on/)
/
[off](http://api.jquery.com/off/)
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
[THREE.Object3D](https://github.com/mrdoob/three.js/blob/master/src/core/Object3D.js)
class globally, it isnt too clean ?
Well 

For more details on
[threex.domevent.js](https://github.com/jeromeetienne/threex/blob/master/threex.domevent.js),
see its [annoted source](http://jeromeetienne.github.com/threex/docs/threex.domevent.html).



# list of bound events
Always in a effort to stay close to usual pratices, the events name are the same as in DOM.
The semantic is the same too.
Currently, the available events are
[click, dblclick, mouseup, mousedown](http://www.quirksmode.org/dom/events/click.html),
[mouseover and mouse out](http://www.quirksmode.org/dom/events/mouseover.html).
  
# Conclusion

[src](https://github.com/jeromeetienne/threex/blob/master/threex.domevent.js),
/
[doc](http://jeromeetienne.github.com/threex/docs/threex.domevent.html).

[src](https://github.com/jeromeetienne/threex/blob/master/threex.domevent.object3d.js),
/
[doc](http://jeromeetienne.github.com/threex/docs/threex.domevent.object3d.html).

* We all know the click event trigger when the user click on a webpage.
* wouldn't it be great to have that but in a 3D page ?
