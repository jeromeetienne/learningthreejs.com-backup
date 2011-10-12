---
layout: post
title: "Lets Make a 3D Game: microphysics.js"
published: true
date: 2011-10-03 12:36
comments: true
categories: [physics, tutorial3dgame]
---

## Motivation

The need for physics is clear from [marblesoccer](http://marblesoccer.com).
All those marbles must move and react together in a instinctive way.
Ok so how to get a 3D physics engine ?

### Do it yourself?
Well no, it is hard, long and im lazy :)

### Use an existing one ?
i tried some and left unimpressed. All those are new experimental stuff.
Documentation is inexistant. They are issued from existing libraries in other languages, sometime
multiple conversions in a row. I experienced major bugs when i tried. were that bugs ? or was it me
miusing it ? quite possible as the doc is inexistant.
i didnt feel it would be a reliable dependancy for our game.

### Ask somebody else to do it ?
We got a winner !!! [@pyalot](http://twitter.com/#!/pyalot) from [codeflow.org](http://codeflow.org/)
did one taylor made for us. It is called *microphysics.js*.
less than 500 lines at the moment.
bite-sized, eleguant, efficient, small engouth to be understood.
Currently it implements moving spheres and static
boxes (or [AABB](http://en.wikipedia.org/wiki/Axis-aligned_bounding_box) as we like to say).
Aka all we need for [marblesoccer](http://marblesoccer.com), the good thing about tailor-made.
We are in business.



## Microphysics.js

* what is a body

* what is a Sphere.. a ball
* a AABB in general

```javascript
	var world = new vphy.World()
```

```javascript
	world.start(Date.now()/1000);
```

```javascript
	var timeStep	= 1/60;
	world.step(timePrecision, Date.now()/1000);
```

# Bodies

```javascript
	var body	= new vphy.body({
		x : 1,
		y : 20,
		z : 99,
		restitution	: 0.6
	});
```

```javascript
	var body = new vphy.AABB({
		width	: 1,
		height	: 1,
		depth	: 1
	});
```

```javascript
	var sphere	= new vphy.Sphere({
		radius		: 20,
	});
```


After a step, you can read the new position of each body.

```javascript
	var pos	= body.getPosition();	// x = pos[0], y = pos[1], z = pos[2]
```

# Attractors

how to push gravity

```javascript
	world.add(new vphy.LinearAccelerator({
		x	:  0, 
		y	: -9.8,
		z	:  0
	}));
```

how to make a custom attractor, for example you want to make a sphere move with [keyboard](/blog/2011/09/12/lets-Make-a-3D-game-keyboard/)

```javascript
	var player	= new vphy.Sphere({ radius : 20 });
	world.add({
		type: vphy.types.ACCELERATOR,
		perform: function(){
			if( keyboard.pressed('right') )	player.accelerate(1,0,0);
			if( keyboard.pressed('left') )	player.accelerate(-1,0,0);
			if( keyboard.pressed('up') )	player.accelerate(0,0,1);
			if( keyboard.pressed('down') )	player.accelerate(0,0,-1);
		}
	});
```


## Notes on Box2D
Box2D is an excelent 2D physics engine.
[Seth Ladd](http://blog.sethladd.com/) recently did
[a](http://blog.sethladd.com/2011/09/box2d-collision-damage-for-javascript.html)
[lot](http://blog.sethladd.com/2011/09/box2d-impulse-and-javascript.html)
[of](http://blog.sethladd.com/2011/09/box2d-with-complex-and-concave-objects.html)
[good](http://blog.sethladd.com/2011/09/box2d-and-polygons-for-javascript.html)
[things](http://blog.sethladd.com/2011/09/box2d-web-workers-better-performance.html)
to explain box2D.

Ok, box2D is a converted one but it works excelently.
So why not using box2D ? it is of very good quality. Well because it is
2D and we do 3D :) It would be such a tough limitation.
This webgl + box2D strategy can produce excelent stuff tho, like this
[game demo](http://game.2x.io/) from [@einaros](http://twitter.com/#!/einaros).
look very closely the physics when object
move, it is amazingly realistic, it is all box2D.

