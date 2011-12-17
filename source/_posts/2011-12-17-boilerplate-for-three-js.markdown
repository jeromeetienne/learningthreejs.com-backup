---
layout: post
title: "Boilerplate for Three.js"
date: 2011-12-17 19:09
comments: true
published: false
categories: [three.js, library]
---

* inpired by [html5 boilerplate](http://html5boilerplate.com/).


* what is a boilerplate ?
* see html5 site

* do a screencast when i go thru the source
* do a screencast with live coding to show how it speed up boostrap
* Always in effort to make 3D easier.
* docco docs ?
  * possible for html ?
* find a good name
  * 3jsbp
  * boilerplatethree.js
* good practice and faster boostrap


* live coding of me doing 3D text "Boilerplate for Three.js"
  * get the code boilerplatethree.js
  * run it
  * load it
  * open the js in a text editor
  * go in the example which does 3D text
  * get the js and the include
  * past it in the boiler plate
  * reload
  * voila! stop chrono

## What is it now ?

* This project is real early

## What about the future ?
* announce a builder for later
  * [jszip](http://jszip.stuartk.co.uk/)
  * [shorttag.js](https://github.com/jeromeetienne/shorttag.js)
* cleaner output

* how to get it ?
	
* [Boilerplate for Three.js](https://github.com/jeromeetienne/3bp)
* [demo](http://jeromeetienne.github.com/3bp)

## feature

* works on desktop and tablets
* touch support
* if no webgl isnt avialable, it fallbacks on canvas2D
  * it isnt always possible to fallback.
  * Materials are especially sensible.
  * Many materials are webgl specific as they contains shaders.
  * canvas2D got no shaders.
* fullscreen support
  * seen in [post](/blog/2011/11/17/lets-make-a-3d-game-make-it-fullscreen/)
* screenshot support
  * seen in [post](/blog/2011/09/03/screenshot-in-javascript/)
* window resize support
  * seen in [post](/blog/2011/08/30/window-resize-for-your-demos/)

## Let's get started

```
	git clone git://github.com/jeromeetienne/3bp.git
```
