---
layout: post
title: "Tween.js for Smooth Animation"
date: 2011-08-17 10:16
comments: true
categories: [demo, library]
---

This post presents [tween.js](https://github.com/sole/tween.js) and how you can use it to easily smooth your animation.
**tween.js** is a "super simple, fast and easy to use tweening engine" from [sole](https://github.com/sole).
It provides tweening and full blown animations thanks to chaining. Lets get started!

Show, dont tell, here is a [demo](/data/tweenjs_for_smooth_animation/tweenjs_for_smooth_animation.html)
using tween.js


# Tweening... what's that ?

{% img right /data/tweenjs_for_smooth_animation/images/tweenjs-linear-easenone.png Linear %}

From [wikipedia article](http://en.wikipedia.org/wiki/Tweening), *tweening* is an abreviation of *inbetweening*, i
dont know why but i find that funny maybe between *inbetweening* isnt a word to begin with :)
Lets get back to business, what is a tween ? It is a interpolation between 2 values, from ```a``` to ```b``` or from source to target.
The tween will simply generate the needed values needed inbetween those 2 limits. It will be done according to a
special function. The one on the right is the linear, the most obvious one, straight and simple.

{% img right /data/tweenjs_for_smooth_animation/images/tweenjs-cubic-easeinout.png Cubic EaseInOut %}
{% img left /data/tweenjs_for_smooth_animation/images/tweenjs-elastic-easeinout.png Elastic EaseInOut %}

But some are more funky, you can
see *Cubic EaseInOut* on the right and *Elastic EaseInOut* on the left.
Many others exist for our delight as you can see [here](http://sole.github.com/tween.js/examples/03_graphs.html).

<!--more -->

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


