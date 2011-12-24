---
layout: post
title: "Let’s Make a 3D Game: Virtual Joystick"
date: 2011-12-24 12:21
comments: true
categories: 
---

Here is another article of the "Let's Make a 3D Game"
[series](/blog/categories/tutorial3dgame/).
We have already seen how to handle other inputs like
[keyboard](/blog/2011/09/12/lets-Make-a-3D-game-keyboard/)
and 
[device orientation](/blog/2011/09/20/lets-make-a-3D-game-device-orientation/).
This post is about [virtualjoystick.js](https://github.com/jeromeetienne/virtualjoystick.js)
It **virtual joystick**, another input you can use for your games.
A virtual joystick emulates a joystick behaviour on a touch screen.
[virtualjoystick.js](https://github.com/jeromeetienne/virtualjoystick.js)
has been coded in a effort to port
[marblesoccer](http://marblesoccer.com)
to mobile device.
Show, dont tell, 
[Try it out](http://jeromeetienne.github.com/virtualjoystick.js/).

* This
[demo](http://jeromeetienne.github.com/virtualjoystick.js/)
works with mouse events too thus, it is easier to test/debug.
* [virtualjoystick.js](https://github.com/jeromeetienne/virtualjoystick.js)
has been widely inpired by
[this post](http://sebleedelisle.com/2011/04/multi-touch-game-controller-in-javascripthtml5-for-ipad/)
by
[Seb Lee-Delisle](http://sebleedelisle.com/)
* The screencast below is short introduction about
[virtualjoystick.js](https://github.com/jeromeetienne/virtualjoystick.js)
  * go to the github page
  * give the topic
  * (move stuff on the screen while talking)
  * This is a screencast about virtualjoystick.js
  * This is a a javascript library which emulate a joystick on touch screen
  * This library done while porting marblesoccer to mobile devices
  * Game controller very usefull for mobile
  * it has been widely impired by this post from seb.ly
  * a cool guy, go look at creativejs. Many fun stuff to play with there.

  * so what does this library too do ?
  * lets play with the demo.
  * the demo works with mouse events too, a usefull feature when you develop (or shoot screencast :). 
  * you press anywhere on the screen and then drag
  * you got the base and the stick
  * you land the base when you touch
  * you move the stick while dragging

  * you can see the coordinates here
  * possible to read it with ananolic coord
  * or more with a arrowkeys coords
  * pick the one that best fit your need.

  * the fact the player can land the base anywhere is cool.
  * this means you can use your left hand, or your right hand
  * You can click anywhere, so you never miss to click on the proper spot :) 
  
  * Well that's it, a short. Thats all folks.

## Let's Get Started

So lets see how to use it. First step, you download
[virtualjoystick.js](https://raw.github.com/jeromeetienne/virtualjoystick.js/master/virtualjoystick.js)
from its
[github](https://github.com/jeromeetienne/virtualjoystick.js)
Then include it in your own code.

```html
	<script src="virtualjoystick.js"></script>
```

The joystick is composed of 2 parts: the *base* and the *stick*.
First the plare touch the screen, it gives the position of the *base*.
Then it drags its fingers to gives the position of the *stick*

## Let's Use it

First step is to create the object from ```VirtualJoystick``` class.

```javascript
	var joystick = new VirtualJoystick(opts)
```

* ```opts.container``` 
* ```opts.stickElement``` is the
[dom element](https://developer.mozilla.org/en/DOM/element)
which is display for the *stick* of the joystick.
* ```opts.baseElement``` is the 
[dom element](https://developer.mozilla.org/en/DOM/element)
which is display for its *base*.
* Both elements are optional with sensible default
* ```opts.mouseSupport``` 


* You may look at the [index.html](https://github.com/jeromeetienne/virtualjoystick.js/blob/master/index.html).
It is an example which uses the library.

* It is possible to read analogic coordinates.
```joystick.deltaX()``` gives the *delta x* between the base and the stick in pixel.
```joystick.deltaY()``` gives the *delta y*.

* Those analogic coordinates may be interpreted as a
[joystick with 4 switches](http://www.slagcoin.com/joystick/restrictors.html).
```joystick.up()``` tells you if your joystick is up or not.
You guessed the meaning of ```.down()```, ```.right()``` and ```.left()```.

<iframe src="http://jeromeetienne.github.com/virtualjoystick.js/"
	webkitallowfullscreen mozallowfullscreen allowfullscreen 
	width="420" height="315" frameborder="0" style="float: right; margin-left: 1em;">
</iframe>

## conclusion
* the source is available on
[github](https://github.com/jeromeetienne/virtualjoystick.js)
under MIT license.

* That's all folks, have fun.