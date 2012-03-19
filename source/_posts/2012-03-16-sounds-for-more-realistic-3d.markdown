---
layout: post
title: "Sounds for More Realistic 3D"
date: 2012-03-16 01:08
comments: true
categories: audio, threejs, threex
---

* The
[specification](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html)
itself is clear and very readable.
* You can find more comprehensive documentation at [html5rocks](html://html5rocks.com).
* It contains several very usefull tutorials to learn Web Audio API.
* They go from
["Getting started with the web audio API"](http://www.html5rocks.com/en/tutorials/webaudio/intro/)
to
["developing game audio"](http://www.html5rocks.com/en/tutorials/webaudio/games/)
or
["mixing positional audio and webgl"](http://www.html5rocks.com/en/tutorials/webaudio/positional_audio/).
* You can find more demos in
[chromium samples](http://chromium.googlecode.com/svn/trunk/samples/audio/index.html).

* Definitly a good technology. aeb audio spacialisation is great addon to webgl.
It makes the scene so much more realistic.
More immersive experiences.

* TODO add link on the playground for people to try it
* explain the minimal here, only what is used in the screencast
* point to 

## Let's get Started

First you need to enable WebAudio into your world. 
Thus you will be able to play sound in it. 

```javascript
    world.enableWebAudio();
```

Now that the world is able to do sound, lets create one

```javascript
    var sound = tQuery.createSound();
```

Now we need to load a sound file and to start playing it. The callback
is notified when the file is downloaded. At this point, the sound
it ready to play.

```javascript
    sound.load('techno.mp3', function(sound){
        sound.play();
    });
```

## Spacialisation and Animation

One definitively interesting part for
[webaudio API](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html)
is the ability to spacialize the sound.
The easiest way to do that is to use ```.follow()``` function. 

```javascript
    sound.follow(object3d);
```

If you want more controls, you can check
```.updateWithObject3d()``` or ```.updateWithMatrix4()```.
You may want to animate your 3D object based on the sound you hear.
For that, a simple function ```.amplitude()``` has been written.
It is likely a naive implementation but it does the trick, i think.

```javascript
    var amplitude = sound.amplitude();
```

It returns an average of the low frequency of the played sound.
It is a easy way to make this.
Note that i dunno if it is the proper term in audio world.
Most likely not :)
If you know the proper term, please leave a comment.

## Want more info ?

You get two examples in
[the source](https://github.com/jeromeetienne/tquery/tree/master/plugins/webaudio/examples).
The
[minimal one](http://jeromeetienne.github.com/tquery/plugins/webaudio/examples/)
simply play a sound.
The other is more interactive. It is the
[playground](http://jeromeetienne.github.com/tquery/plugins/webaudio/examples/playground).
It allows to play with various parameters.
tQuery API documentation is provided via
[jsdoc](http://code.google.com/p/jsdoc-toolkit/).
You can find the whole API 
[here](http://jeromeetienne.github.com/tquery/).
The plan is to do the same for the plugins.

So for tQuery WebAudio plugin, you get API documentation of each class: the main class
[tQuery.WebAudio](http://jeromeetienne.github.com/tquery/docs/symbols/tQuery.WebAudio.html)
and the
[Sound class](http://jeromeetienne.github.com/tquery/docs/symbols/tQuery.WebAudio.Sound.html).
You can even check the
[Node chain builder](http://jeromeetienne.github.com/tquery/docs/symbols/tQuery.WebAudio.NodeChainBuilder.html)
doc if you want to go deep and configure your own audio nodes chain :)

## Conclusion



## meta
* make it tQuery
* describe the API
* link to the demo
  * the demo must be copied in the blog repo
* TODO find more sounds demo

**done**

* link to all the learning rescource


```javascript
    <!doctype html><title>tQuery minimal page</title>
    <script src="../../build/tquery-all.js"></script>
    <body><script>
	// this is a screencast to demo tQuery WebAudio Plugins
	var world = tQuery.createWorld().boilerplate().start();
	var object = tQuery.createTorus().addTo(world);
	// enable webaudio on our world
	world.enableWebAudio();
	// add Axis as debug
	tQuery.createAxis().addTo(object);
	// create and load a sound
	var url	= '../../plugins/assets/sounds/techno.mp3';
	var sound = tQuery.createSound().load(url, function(sound){
		// make the sound loop
		sounds.nodes.bufferSource.loop = true;
		// trigger the sound playing
		sound.play();
	});
	// make the object scale move according to sound amplitude
	world.loop().hook(function(){
		object.scale(sound.amplitude() * 2 + 0.5);
	});
    </script></body>
```

