---
layout: post
title: "Introduction to Particles With Sparks.js"
date: 2011-12-08 16:08
published: false
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

<iframe src="http://mrdoob.github.com/three.js/examples/webgl_particles_shapes.html" width="100%" height="420" frameborder="0"></iframe>

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
```javascript
	emitter.addInitializer( new SPARKS.Position( new SPARKS.PointZone( emitterpos ) ) );
	emitter.addInitializer( new SPARKS.Lifetime( 1, 15 ));
	emitter.addInitializer( new SPARKS.Target( null, setTargetParticle ) );
	emitter.addInitializer( new SPARKS.Velocity( new SPARKS.PointZone( new THREE.Vector3( 0, -5, 1 ) ) ) );
```

## Actions
```javascript
	emitter.addAction( new SPARKS.Age() );
	emitter.addAction( new SPARKS.Accelerate( 0, 0, -50 ) );
	emitter.addAction( new SPARKS.Move() );
	emitter.addAction( new SPARKS.RandomDrift( 90, 100, 2000 ) );
```

## Events
```javascript
	emitter.addCallback( "created", onParticleCreated );
	emitter.addCallback( "dead", onParticleDead );
```
