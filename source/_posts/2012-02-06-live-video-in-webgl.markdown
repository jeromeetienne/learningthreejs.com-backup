---
layout: post
title: "Fun With Live Video in WebGL"
date: 2012-02-06 13:41
comments: true
categories: [three.js, html5, webrtc]
---

* to get live streaming of the webcam directly in your webgl
* im thinking secondslife
* great interactive
* how to code it ?
* video as texture
* and webrtc to use the media stream API


What can be done with this ?

* the demo to make :
  * the tv on the side
  * the mirror effect with the video


* how to get webrtc running in your browser
  * [run webrtc demos](http://www.webrtc.org/running-the-demos)
* link to [demo](/data/live-video-in-webgl)


## Let's create the video
Create the video element which be displayed

```javascript
	video		= document.createElement('video');
	video.width	= 320;
	video.height	= 240;
	video.autoplay	= true;
```

## Can the webcam be a source

To detect if the media stream API is available, use this line.

```javascript
	var hasUserMedia = navigator.webkitGetUserMedia ? true : false;
```

If it isn't, you may point the users to 
[this doc on how to get it](http://www.webrtc.org/running-the-demos)
and/or using a normal video file. 

```javascript
	navigator.webkitGetUserMedia('video', function(stream){
		// If the stream is obtained, create the magic url to get it
		video.src	= webkitURL.createObjectURL(stream);
	}, function(error){
		// if no stream is obtained, fallback on a classic video file
		console.log("Failed to get a stream due to "+ error);
		video.src	= "videos/sintel.ogv";
	});
```

## Handle the textures

You create the texture using the video as source.

```javascript
	var videoTexture = new THREE.Texture( video );
```



```javascript
	var material	= new THREE.MeshLambertMaterial({
		ambient	: 0x444444,
		color	: 0xffffff,
		map	: videoTexture
	});
```



In your render loop, add those lines. They monitor the state of your video.
Every time the video got enougth data to be display, the texture is updated
and sent to the GPU.

```javascript
	if( video.readyState === video.HAVE_ENOUGH_DATA ){
		videoTexture.needsUpdate = true;
	}
```


## Conclusion


