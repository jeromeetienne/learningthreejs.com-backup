---
layout: post
title: "Introduction to Particles With Sparks.js"
date: 2011-12-08 16:08
published: true
comments: true
categories: [three.js, library]
---

This post is about 
[Sparks.js](https://github.com/zz85/sparks.js).

It is lightweight 3d particle engine in javascript, for use with
[three.js](https://github.com/mrdoob/three.js/)
and
[tween.js](https://github.com/sole/tween.js).

It is from
[zz85](http://www.lab4games.net/zz85/blog/)
who already did
[3D text](http://mrdoob.github.com/three.js/examples/webgl_geometry_text.html)
and
[Catmull Clark subdivision](http://mrdoob.github.com/three.js/examples/webgl_geometry_subdivison.html).

[Particle system](http://en.wikipedia.org/wiki/Particle_system)

Here is a demo of what you can do with sparks.js and three.js. Cool no ?
You want to do the same ? Let me walk you thru the code for particles in this example.

<iframe src="Zhttp://mrdoob.github.com/three.js/examples/webgl_particles_shapes.html" width="100%" height="420" frameborder="0"></iframe>

## Notes

* What is an emitter
* What is a particle

## Lets Get Started

```javascript
	var counter	= new SPARKS.SteadyCounter( 500 );
	var emitter	= new SPARKS.Emitter( counter );
```

```counter``` controls how frequently particles are created

```emitter```

```javascript
	emitter.start();
```

## Initializers

* sparks.js got a very flexible core
* it uses stacks of functions that you can configure to fit your needs.
* you can easily code your own initializers or actions

```javascript
	var originZone	= new SPARKS.PointZone( originVector3 );
	emitter.addInitializer( new SPARKS.Position( originZone ) );
```

```SPARKS.Position(zone)``` initializer set the original position of the particle.
A ```zone``` provide a location in space. 

```javascript
	emitter.addInitializer( new SPARKS.Lifetime( 1, 15 ));
```

```SPARKS.Lifetime(mintime, maxtime)``` initializer set particle's lifetime.
You can specify a range and a random value will be assigned.
Don't forget to add ```SPARKS.Age``` action to handle its lifetime.

```javascript
	var velocityZone= new SPARKS.PointZone( new THREE.Vector3( 0, -5, 1 ) );
	emitter.addInitializer( new SPARKS.Velocity( velocityZone ) );
```

```SPARKS.Velocity(zone)``` initializer set particle's velocity base on a ```zone``` location.

## Zones

```javascript
	new SPARKS.PointZone( new THREE.Vector3(x,y,z) )
```

```javascript
	new SPARKS.LineZone( startVector3, endVector3 )
```

```javascript
	new SPARKS.ParallelogramZone( startVector3, endVector3 )
```

and still other... TODO is that valuable to make it a full documentation ?
better to get a case study

## Actions

actions are performed at every step of a particle life.

```javascript
	emitter.addAction( new SPARKS.Age() );
	emitter.addAction( new SPARKS.Accelerate( 0, 0, -50 ) );
	emitter.addAction( new SPARKS.Move() );
	emitter.addAction( new SPARKS.RandomDrift( 90, 100, 2000 ) );
```


```javascript
	emitter.addAction( new SPARKS.Move() );
```

```SPARKS.Move``` makes the particles move in our 3D space.

```javascript
	emitter.addAction( new SPARKS.Age() );
```

We have already seen ```SPARKS.Age```. It is handle the lifetime of each particle.

```javascript
	emitter.addAction( new SPARKS.Accelerate( 0, 0, -50 ) );
```

```SPARKS.Accelerate(x,y,z)``` changes the velocity by adding a fixed at every step.
This one produces a gravity effect with a negative ```y```.


```javascript
	emitter.addAction( new SPARKS.RandomDrift( 90, 100, 2000 ) );
```

```SPARKS.RandomDrift``` changes the 



# Message to zz85
* what about having a SPARKS.Action base class with inheritance
  * ability to sanity check in .addAction
  * inheritance similar to three.js
* fill bugs to get removeAction and removeInitializer
* What about adding Action and Init at the end of sub class
  * would make the code easier to read and learn ?
  * Zone is doing it now
* what about removing the stimrout from sparks.
  * something like tween.js or microphysics.js
* randomdrift/accelerate should accept a zone, no ?
  * yes it seems
* replace custom pool by objectpool.js one
  * allow to make multiple type of pool easily
* add an action to change the colors
  * start THREE.Color
  * end THREE.color
  * easing for transition