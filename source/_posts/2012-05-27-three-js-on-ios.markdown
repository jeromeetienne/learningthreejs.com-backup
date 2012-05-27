---
layout: post
title: "Three.js on IOS"
date: 2012-05-27 13:48
comments: true
categories: [ios, threejs, tquery]
---

## TOC

* current status
* how to get it
* how to play with three.js and tquery on it
  * the device orientation to control the car
* screencast of me playing


## Notes
* [WebGL Browser](https://github.com/benvanik/WebGLBrowser)
made by
[Ben Vanik](http://noxa.org/)
, or [@benvanik](https://twitter.com/#!/benvanik) on twitter.
* He is the same who did [WebGL Inspector](https://github.com/benvanik/WebGL-Inspector).
* This trick has been discovered by
[Nathan de Vries](https://twitter.com/#!/atnan)
* He told about it in this
[excelent post][http://atnan.com/blog/2011/11/03/enabling-and-using-webgl-on-ios/].
* impossible to get it for the apps store unfortunatly
* because it use an unofficial API.
* fps of the car demo
  * Good part: fps are good. Bad part: speed is slower and balanced differently
  
  * not bad 40fps is enougth to make a game
  * need time to understand the plateform
 
  * The Plateforms are different. a mobile is not just a slower desktop.
  * Yeah surely, a mobile is much slower than a desktop.
  * But this isn't all.
  * From my early experiences, the ratio gpu speed vs cpu speed tends to be quite different.
  * The communication speed between gpu and cpu seems to be slow.
  * Those are just feeling, no actual benchmarks obviously.
  
  * Only early results here, time will tell much more.
  * But if having a different balance between components is confirmed, it is more
    important than it seems.
  * This implies that my optimisation on the desktop are invalid on the mobile.
  * So possibly i have to redesign my 3D scene for mobiles.

* status of three.js on iOS
* how to use three.js on iOS, how to use tQuery on iOS
* distribution of tQuery ?
  * tquery.js is 6k
  * tQuery.js bundle is XXk