---
layout: post
title: "Particles: Online Editor for Sparks.js"
date: 2011-12-17 19:11
comments: true
published: true
categories: [three.js, library, sparks.js, particles]
---

This post is the second of our [serie on particles](/blog/categories/particles).
It presents
[sparkseditor](http://jeromeetienne.github.com/sparkseditor/)
, an online editor for
[sparks.js](https://github.com/zz85/sparks.js).

[sparkseditor](http://jeromeetienne.github.com/sparkseditor/)
is widely inpired by
[glsl editor](http://glsl.heroku.com/e)
from
[mrdoob](http://mrdoob.com/)
and
[shadertoy](http://www.iquilezles.org/apps/shadertoy/)
from
[Inigo Quilez](http://www.iquilezles.org/).
Recently [lea verou](http://lea.verou.me/)
did [dablet](http://lea.verou.me/2011/12/introducing-dabblet-an-interactive-css-playground/),
an online editor for
[css](http://en.wikipedia.org/wiki/Cascading_Style_Sheets).

It is quite obvious thing. 

## Live editor rocks
First a few words about this tendancy to live online editor...

Live editor produces a result immediatly.
It helps design your effect faster.
Very agile to design. 
Be light on your foot kindof style.

Additionally, we have *bookmarkability*
We do that by storing state in url.
It makes it very simple to share your particles effects with others.
On the down side, it makes super long+ugly urls...
[url shoterning](http://en.wikipedia.org/wiki/URL_shortening)
helps us reduces this issue.
In our case, we use
[bitly](https://bitly.com/)
service.

* html5 is all its power
* This editor is purely static files, no specific server to run, no need to admin and no risk to go offline.
Oh and by the way i dont not even have to pay for hosting this application.
* The web is becoming something real nice :)

## bouya
* the editor lower the barrier of entry on sparks.js three.js particles.
* What is possible to do with this editor
  * minify url
  * screenshot
  * fullscreen
  * code editor
* it is opensource, available on [github](https://github.com/jeromeetienne/sparkseditor) under MIT license. 
* [sparkseditor](http://jeromeetienne.github.com/sparkseditor/)

## conclusion
* Under the hood,
[sparkseditor](http://jeromeetienne.github.com/sparkseditor/)
uses
[threex.sparks.js](https://github.com/jeromeetienne/threex/blob/master/threex.sparks.js), a
[threex](https://github.com/jeromeetienne/threex)
helper, to make
[sparks.js](https://github.com/zz85/sparks.js/)
even easier to use.
This helper will be the subject of a future post of our
[particles series](/blog/categories/particles).

That's all folks, have fun :)

## TODO
* screencast to show to use it
  * short
  * script it
* some examples
  * ok but which one ?
  * in iframe ?
  * picture ?
