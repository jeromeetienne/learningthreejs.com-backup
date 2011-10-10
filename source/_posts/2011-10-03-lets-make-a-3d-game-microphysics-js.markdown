---
layout: post
title: "Lets Make a 3D Game: microphysics.js"
published: true
date: 2011-10-03 12:36
comments: true
categories: [physics, tutorial3dgame]
---

* a marble game needs a good physics
* the choise was
  * do it yourself
  * use on of those converted one
    * i tried some and left unimpressed. all those are new stuff, documentation
      is inexistance. the multi convertion make the code hard to read.
    * i didnt feel it would be a reliable dependancy for our game.
  * box2D is a converted one but it works excelently. sethladd recently
    did a lot of good thing to explain box2D.
  * why not using box2D ? it is of very good quality. Well because it is
    2D and we do 3D :) It would be such a tough limitation.
  * This webgl + box2D strategy can produce excelent stuff tho, like this
    [game demo](http://game.2x.io/) from [@einaros](http://twitter.com/#!/einaros)
  * btw it shows off box2D too, look very closely the physics when object
    move, it is amazingly realistic, it is all box2D.
  * find somebody to write it for us
    * @pyalot has been kind enougth to write microphysics.js for us.
    * microphysics.js is a micro library for 3D physics.
    * only 400 line at the moment. bite-sized, eleguant, efficient, small engouth to be understood
    * Currently it only implements moving spheres and static
      boxes (or [AABB](http://en.wikipedia.org/wiki/Axis-aligned_bounding_box) as we like to say).
    * Well it is supporting all the features we need, the good thing about tailor-made.

## Microphysics.js

* what is a body

* what is a Sphere.. a ball
* a AABB in general

```javascript
	var world	= new vphy.World()
```

```javascript
	world.start(Date.now()/1000);
```

```javascript
	var body	= new vphy.body({
		x			: 1,
		y			: 20,
		z			: 99,
		restitution	: 0.6
	});
```

```javascript
	var body	= new vphy.AABB({
		size	: {
			width	: 1,
			height	: 1,
			depth	: 1
		}
	});
	// Same api for AABox, different behaviour for collision
	// vphy.AABB keeps other bodies *inside* the box,
	// vphy.AABox keeps other bodies *outside* the box,
```

```javascript
	var sphere	= new vphy.Sphere({
		radius		: 20,
	});
```

```javascript
	var timePrecision	= 1/60;
	world.step(timePrecision, Date.now()/1000);
```

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


After a step, you can read the new position of each body.

```javascript
	var pos	= body.getPosition();	// x = pos[0], y = pos[1], z = pos[2]
```

## THREEx helpers

* **HERE** you put the doc in THREEx docco header

# Initialisation

You instanciate the physics engine, like that.

```javascript
	var microphysics	= new THREEx.Microphysics(opts);
```

```opts``` is optional.
```opts.timeStep``` controls the frequency of the world update.
The smaller it is the more accurate is the physics but the longer it is to compute.
It defaults to ```1/60```.

Then you start it

```javascript
	microphysics.start();
```

# Binding THREE.Mesh to microphysics.js

Of course we need to add some mesh in the world. After this line, the ```mesh```
position is driven by the physics.

```javascript
	microphysics.bindMesh(mesh);
```

```javascript
	microphysics.unbindMesh(mesh);
```

In your render loop, add this line. It will first update the physics world and
then move accordingly any ```THREE.Mesh``` you added.

```javascript
	microphysics.update(scene);	
```

# Needs a Direct Access ?

If you need to have direct access to microphysics.js, this will give your the body bound to a ```mesh```.

```javascript
	mesh._vphyBody;	// the microphysics.js body
```

or do the following to get the microphysics.js world

```javascript
	microphysics.word()	// the microphysics.js world
```
