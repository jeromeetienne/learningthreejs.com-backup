---
layout: post
title: "Particles: Online Editor for Sparks.js"
date: 2011-12-17 19:11
comments: true
published: true
categories: [three.js, library, sparks.js, particles]
---

This post is the second of our [serie on particles](/blog/categories/particles).
It presents a online editor for
[sparks.js](https://github.com/zz85/sparks.js).

* Present the editor
* screencast to show to use it
  * short
  * script it
* inpired by
[glsl editor](http://glsl.heroku.com/e)
from
[mrdoob](http://mrdoob.com/)
and
[shadertoy](http://www.iquilezles.org/apps/shadertoy/)
from
[Inigo Quilez](http://www.iquilezles.org/).
* first a few words about this tendancy to live online editor.
* live editor produces a result immediatly.
* It helps design your effect faster
* very agile design, 
* light on your your foot as brucelee said. Link.
* we have bookmarkability. Link. 
* we do that by storing state in url.
* it makes it super easy to share your particles effects with others.
* name sparkseditor without E
* ok All is dandy in our perfect pinky world ? 
* on the down side, it makes super long+ugly urls, but
[url shoterning](http://en.wikipedia.org/wiki/URL_shortening)
helps us reduces this issue.
* in our case we use [bitly](https://bitly.com/)
* html5 is all its power
* all is static files
* no specific server to run, no need to admin, no risk to go offline
* oh and by the way i dont not even have to pay for hosting this application.
* the web is becoming something real nice :)
* lower the barrier of entry on sparks.js three.js particles
* some examples
  * ok but which one ?
  * in iframe ?
  * picture ?
* announce threex.sparks.js
  * in the background, it use a library threex.sparks.js to make it even easier to use.
  * It will be the subject of a future post of our [particles serie](/blog/categories/particles).
  * put that in conclusion
* put the editor in its own repo ?
  * what would be the name ?
  * onlineeditorsparks.js ?
  * http://jeromeetienne.github.com/sparkEditor hmm seems good
* What is possible to do with this editor
  * minify url
  * screenshot
  * fullscreen
  * code editor
* [url](http://jeromeetienne.github.com/sparks.js/editor/)