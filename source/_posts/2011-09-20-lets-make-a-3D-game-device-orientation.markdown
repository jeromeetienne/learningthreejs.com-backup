---
layout: post
title: "Let's Make a 3D Game: Device Orientation"
date: 2011-09-20 10:35
comments: false
categories: [three.js, html5, tutorial3dgame]
---

Here is another article of the "Let's Make a 3D Game" [series](/blog/categories/tutorial3dgame/).
It is about **device orientation**, another input you can use for your games.
We have already seen how to handle [keyboard](/blog/2011/09/12/lets-Make-a-3D-game-keyboard/).

here is the [demo](/data/lets-make-a-3d-game-player-control/)


## Let's use the device orientation

## Let's see the standard

Here is the [spec](http://www.w3.org/TR/orientation-event/)

nice articles on [html5rocks](http://www.html5rocks.com/en/tutorials/device/orientation/)
or [mdn](https://developer.mozilla.org/en/detecting_device_orientation)

Let's bind the events

```javascript
    window.addEventListener('deviceorientation',  callback, false);
```

Here is an example of callback

```javascript
    function callback(event){
        console.log("orientation gamma:", event.gamma, "beta", event.beta, "alpha", event.alpha);
    }
```

gamma, beta, alpha may or may not be defined depending on the device your game is
running on.

For example on macbook, ```alpha``` is always ```null```.



## Let's include the script

You download it from [here](/data/THREEx/THREEx.DeviceOrientationState.js) and include
it in your page like this

```html
	<script src='THREEx.DeviceOrientationState.js'></script>
```

## How to use it ?

Now that the script is included, create a ```device``` variable like this.

```javascript
    var device = new THREEx.DeviceOrientationState();
```

After that, if you want the angle the device with the x axis, just use
```.angleX()``` function. You can use ```.angleY()``` and ```.angleZ()```, you
guessed which angle they provide.
Suppose you want a ```THREE.Mesh``` to stay still on y axis while you are moving the device,
just copy this line

```javascript
    mesh.rotation.y	= device.angleY();
```

If you ever want to stop listening to the device orientation, just use this line

```javascript
    device.destroy()
```


## Conclusion

For more details on [THREEx.DeviceOrientationState](/data/THREEx/THREEx.DeviceOrientationState.js),
see its [annoted source](/data/THREEx/docs/THREEx.DeviceOrientationState.html).
