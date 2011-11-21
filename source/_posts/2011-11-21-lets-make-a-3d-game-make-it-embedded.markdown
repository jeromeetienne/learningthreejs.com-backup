---
layout: post
title: "Lets Make a 3D Game: Make It Embedded"
date: 2011-11-21 16:32
comments: true
categories: [tutorial3dgame, THREEx, html5]
---

When your game is embedded
It is running in a iframe.
It is likely smaller on screen.

# First declare the iframe

```html
	<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen
		width="480" height="320" frameborder="0"
		src="http://marblesoccer.com">
	</iframe>
```

For the attributes, it is ```frameborder``` to remove an ugly border,
```width``` and ```height``` for the dimension,
```*allowfullscreen``` to allow fullscreen and
```src``` for your game page.

# Detect the iframe

You may need to detect if your game page is embedded or not.

```javascript
	var isInIframe	= (window != window.top);
```

# Adapt to the smaller display

When your game is embedded, it is most likely smaller on the screen. How to deal
with this ? We need to fit to the smaller display.
It has 2 type: the 3D display where three.js displays the WebGL, and the DOM display
for all the
[OSD](http://en.wikipedia.org/wiki/On-screen_display)
e.g. score, timers and other popups.

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
It wont try to teach you css, other do that much
[better](https://developer.mozilla.org/en/CSS/Media_queries),
[than](http://www.html5rocks.com/en/mobile/mobifying.html#toc-mediaqueries),
[me](http://thinkvitamin.com/code/media-queries-width-and-height-video-tutorial/).
Just a pick of what i did. Suppose you want to specify css rules when your
display is 640px wide or less. Typically, you may reduce the size of your
font or icons. 

```css
	@media all and (max-width: 640px) {
		/* here put your style specific for embedded case */
		body { font-size : 60%; }
		img { width : 48px; }
	}
```

# Shield Events

Note:

* **1)** demontrate the problem
  * give it threex demo iframe
* **2)** describe the problem
* **3)** fix the problem

When the iframe got the focus, it will receive the DOM event first and then
those events will be propagated up to the hosts frame.


Here is the code which listen to the keydown on arrows and prevent their default,
in our case, the scrolling of the hosting page.

```javascript
	document.addEventListener('keydown', function(event){
		// if it is keydown on a arrow, prevent default
		if( event.keyCode >= 37 && event.keyCode <= 40 ){
			event.preventDefault();
		}
	}, true);
```

<iframe src="/data/THREEx/examples/threex.embedded/noshield-iframe.html" allowfullscreen webkitfullscreen mozallowfullscreen width='320' height='240'></iframe>

<iframe src="/data/THREEx/examples/threex.embedded/withshield-iframe.html" allowfullscreen webkitfullscreen mozallowfullscreen width='320' height='240'></iframe>


