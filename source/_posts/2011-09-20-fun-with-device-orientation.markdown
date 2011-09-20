---
layout: post
title: "Fun with Device Orientation"
date: 2011-09-20 10:35
comments: false
categories: [three.js, html5]
---

## Notes to sort out

Here is the [spec](http://www.w3.org/TR/orientation-event/)

Let's bind the events

```javascript
    window.addEventListener('deviceorientation',  callback, false);
```

Here is an example of callback

```javascript
    function callback(event){
        console.log("orientation gamma:", event.gamma, "beta", event.beta, "alpha", event.alpha);
    }
```

