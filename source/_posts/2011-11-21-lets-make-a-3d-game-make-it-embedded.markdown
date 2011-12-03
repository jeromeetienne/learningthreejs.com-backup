---
layout: post
title: "Lets Make a 3D Game: Make It Embedded"
date: 2011-11-21 16:32
comments: true
categories: [tutorial3dgame, THREEx, html5]
---

<iframe src="http://marblesoccer.com"
	allowfullscreen webkitallowfullscreen mozallowfullscreen
	width="320" height="240" frameborder="0" style="float: right;">
</iframe>

## TODO

* intro + conclusion
* what about the THREEx
* a demo of the game
* complete event shielding writing



When your game is embedded
It is running in a iframe.
It is likely smaller on screen.

## Let's go play in an iframe

First we declare it like that

```html
	<iframe src="http://marblesoccer.com"
		allowfullscreen webkitallowfullscreen mozallowfullscreen
		width="480" height="320" frameborder="0">
	</iframe>
```

The attributes are pretty classics: ```frameborder``` to remove an ugly default border,
```width``` and ```height``` for size and ```src``` for your game page.
The ones ending with ```allowfullscreen``` tell the browser that this iframe is
allowed to go fullscreen. More details about fullscreen in this
[previous post](/blog/2011/11/17/lets-make-a-3d-game-make-it-fullscreen/)
or in the [spec](http://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html).

You may need to determined if your game is embedded or not.
so . Simply use this line to know if it is in a iframe or not.

```javascript
	var isInIframe	= (window != window.top);
```

## Fit in a smaller display

When your game is embedded, it is likely to have a smaller display. How to deal
with this ?
First there are 2 type of rendering in our game:
a 3D display where
[three.js](https://github.com/mrdoob/three.js/)
displays the
[WebGL](http://en.wikipedia.org/wiki/WebGL), and
a DOM display for
[OSD](http://en.wikipedia.org/wiki/On-screen_display)
such as score, timers and other popups.

First *let's fit the 3D display*.
We have already seen the solution in a previous post about
[window resizing](/blog/2011/08/30/window-resize-for-your-demos/).
Just download
[THREEx.WindowResize](/data/THREEx/THREEx.WindowResize.js) and add this line

```javascript
	THREEx.WindowResize(renderer, camera);
```

Not too hard, hey. Now *lets adapt the DOM display*. It is simply done via CSS.
Personnaly i used
[media queries](http://www.w3.org/TR/css3-mediaqueries/)
for that. 
Typically, you may reduce the size of your font or icons.
I won't try to teach you css, other do that much
[better](https://developer.mozilla.org/en/CSS/Media_queries)
[than](http://www.html5rocks.com/en/mobile/mobifying.html#toc-mediaqueries)
[me](http://thinkvitamin.com/code/media-queries-width-and-height-video-tutorial/).
Just a pick of what i did, not sure at all it is the best way.
I reduce the OSD display if your game page is 640px or less.

```css
	@media all and (max-width: 640px) {
		/* here put your style specific for embedded case */
		body { font-size : 60%; }
		img { width : 48px; }
	}
```

## Shield Events

Strange section title, hey.
It means *prevents DOM events from the iframe to interfere with the host page*.
Not much clearer...
Maybe with an example ? Let's see the arrows+scroll case.

Show dont tell. Below are 2 iframes: on the left, no shielding happens, on the right
shielding happens. Try to click on them and use arrows up/down. On the left, the host page scrolls,
but not on the right.

<iframe src="/data/THREEx/examples/threex.embedded/noshield-iframe.html" width='50%' height='120px'></iframe>
<iframe src="/data/THREEx/examples/threex.embedded/withshield-iframe.html" width='49%' height='120px'></iframe>

With a game, it is frequent to use arrows keys to control the player.
If our game iframe got the focus and users press up or down, the iframe will received
[keydown/keyup events](http://www.quirksmode.org/dom/events/keys.html).
Troubles appear when those events are bubbling to the host page. Those events are
create a scrolling in host page making the game unplayable. 

Here is the code which prevents this behavior. It listens to arrows keydown
and prevent their default, aka host page scrolling.

```javascript
	document.addEventListener('keydown', function(event){
		// if it is keydown on a arrow, prevent default
		if( event.keyCode >= 37 && event.keyCode <= 40 ){
			event.preventDefault();
		}
	}, true);
```



