---
layout: post
title: "Tweenjs for Smooth Animation"
date: 2011-08-17 10:16
comments: true
categories: [demo, library]
---

This post presents [tween.js](https://github.com/sole/tween.js) and how you can use it to easily smooth your animation.
**tween.js** is a "super simple, fast and easy to use tweening engine" from [sole](https://github.com/sole).
It provides tweening and full blown animations thanks to chaining. Lets get started!

Show, dont tell, here is a [demo](/data/tweenjs_for_smooth_animation/tweenjs_for_smooth_animation.html)
using tween.js


# What is tween

From [wikipedia article](http://en.wikipedia.org/wiki/Tweening), *tweening* is an abreviation of *inbetweening* :)
So what is a tween ? It is a interpolation between 2 values, from ```a``` to ```b``` or from source to target.
The tween will simply generate the needed values needed inbetween those 2 limits.
TODO find a visual example. do it with javascript on the example page

The obvious function is the linear one, but [many other exist](http://sole.github.com/tween.js/examples/03_graphs.html).




## How to include it

Simply include the library file in your page. Download it [there](https://github.com/sole/tween.js)

``` html
    <script type='text/javascript' src='tween.js'></script>
```

# How to use it

First we create the tween object
 
``` javascript
    new TWEEN.Tween(current).to(target}, duration)
```

# how to chain tweens

For longer, more varied animations, you can chain multiple tweens. They
will be executed one after the other. Thus to have


<!--more-->


