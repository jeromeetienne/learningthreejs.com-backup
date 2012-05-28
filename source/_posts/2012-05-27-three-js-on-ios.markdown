---
layout: post
title: "Three.js on IOS"
date: 2012-05-27 13:48
comments: true
categories: [ios, threejs, tquery]
---

This post is about IOS and three.js.
It may seem surprising, but [IOS](http://en.wikipedia.org/wiki/IOS) supports WebGL since version 4.2.
There is a tough limitation tho, it is available only in their advertisment plateform,
  [iAds](http://en.wikipedia.org/wiki/IAd), not in safari browser.
I got a ipad2 so i experimented a bit with three.js on iOS to see what is going on.

WebGL is starting to be hot on mobile.
[blackberry playbook2](http://www.blackberry.com/playbook)
got it
[by default](http://devblog.blackberry.com/2012/02/playbook-native-webgl-development/).
[boot on gecko](http://www.mozilla.org/en-US/b2g/) got it too with firefox mobile.
It isn't enabled on android and iOS tho, the 2 majors.
Maybe we will have more info in june with
[google.io](https://developers.google.com/events/io/)
and
[apple event](https://developer.apple.com/wwdc/).
google got [chrome on android](http://www.google.com/intl/en/chrome/android/).
iOS already got [support](http://atnan.com/blog/2011/11/03/enabling-and-using-webgl-on-ios/), this is more a matter of policy.
So lets hope google will announce chrome supports WebGL on mobile.
and apple will announce they accepts WebGL on apps store applications.
I am an optimist personn, i hope :)

Below is a video of me showing WebGL on iPad

<center>
	<iframe width="425" height="349" src="http://www.youtube.com/embed/KxRfFd9SM5s" frameborder="0" allowfullscreen></iframe>
</center>

<!-- more -->


# Meta
## TOC

* surprisingly already available, then how to get it

* current status

* how to play with three.js and tquery on it
  * the device orientation to control the car

* screencast of me playing


## Notes
* [WebGL Browser](https://github.com/benvanik/WebGLBrowser)
made by
[Ben Vanik](http://noxa.org/)
, aka [@benvanik](https://twitter.com/#!/benvanik) on twitter.
* He is the same who did [WebGL Inspector](https://github.com/benvanik/WebGL-Inspector).
* This trick has been discovered by
[Nathan de Vries](https://twitter.com/#!/atnan)
* He told about it in this
[excelent post](http://atnan.com/blog/2011/11/03/enabling-and-using-webgl-on-ios/).
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


# USED


* [blackberry playbook2](http://www.blackberry.com/playbook)
got it
[by default](http://devblog.blackberry.com/2012/02/playbook-native-webgl-development/).
* [boot on gecko](http://www.mozilla.org/en-US/b2g/) got it too with firefox mobile.

* maybe more info in june
  * with
  [google.io](https://developers.google.com/events/io/)
  and
  [apple event](https://developer.apple.com/wwdc/).
  * WebGL is starting to be hot on mobile.
  * google got [chrome on android](http://www.google.com/intl/en/chrome/android/).
  * Current it got no WebGL but it will surely come.
  * iOS already got support, this is more a matter of policy.
  * so lets hope google will announce chrome supports WebGL on mobile.
  * and apple will announce they accepts WebGL on apps store applications.
  * i am an optimist personn, i hope :) 
