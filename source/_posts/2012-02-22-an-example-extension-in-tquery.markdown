---
layout: post
title: "An Example Extension in tQuery"
date: 2012-02-22 08:55
comments: true
categories: 
---




*domEvents* have been ported to tQuery. We saw them a few week back in
['dom events in 3D space' post](http://learningthreejs.com/blog/2012/01/17/dom-events-in-3d-space/).
It is an important part because jQuery developpers use this a lot, thru
[.on()](http://api.jquery.com/on/)/[.off()](http://api.jquery.com/off/).

```javascript
    tQuery('cube').on('mouseover', function(event){
        console.log("somebody put the mouse over a cube");
    });
```

The supported events are click obviously,
[dblclick, mouseup, mousedown](http://www.quirksmode.org/dom/events/click.html)
, [mouseover and mouseout](http://www.quirksmode.org/dom/events/mouseover.html).
It has been improved to better match
[actual dom events](http://www.w3.org/TR/DOM-Level-2-Events/events.html).
The callback now receives a event object. It contains ```.type``` and ```.target```
as described in [dom specification](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-Event).


```javascript
    tQuery('.myClass').on('click', function(event){
        console.log("An event of type", event.type, "has been trigger on ", event.target);
        // If you wish to stop propagation, just do 
        event.stopPropagation();
    });
```

[Event bubbling](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-flow-bubbling)
is now supported. So events are dispatched to the
[target](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget)
and follow its parent chain upward. It is possible to cancel propagation with an usual
```.stopPropagation()```.

