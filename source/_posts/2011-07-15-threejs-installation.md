---
layout: post
published: true
title: Three.js Installation
categories: [basic, webgl]
---

[Three.js](https://github.com/mrdoob/three.js) is a JavaScript 3D library. According
to [mrdoob](http://mrdoob.com/), its author, Three.js is

{% blockquote Mr.doob, Three.js author %}
The aim of the project is to create a lightweight 3D engine with a very low level of
complexity — in other words, for dummies. The engine can render using canvas, svg and WebGL.
{% endblockquote %}

## Step 1: get the source

The source are available [here](https://github.com/mrdoob/three.js). Use
the following command

{% codeblock how to get the source - example.sh %}
git clone https://github.com/mrdoob/three.js.git
{% endcodeblock %}

It will download the whole source on your local disk. You are done, just fire up
a web server, and go to ```/examples```.

<!--more-->

## Step 2: Description of the folder structure

  * [/utils](https://github.com/mrdoob/three.js/tree/master/utils) contains a bunch of utilities.
    You can find a script to [build the releases](https://github.com/mrdoob/three.js/blob/master/utils/build.sh)
    (concatenate and minify the files, and all that).
  * [/build](https://github.com/mrdoob/three.js/tree/master/build) It is an administrative directory
    where the build release is stored. Not really important for a user, it is more for a developper of the library itself.
  * [/src](https://github.com/mrdoob/three.js/tree/master/src) contains the library code itself. We will study that in more detail later. Meanwhile don't hesitate
    to take a look at it, it's pretty small and clean.
  * [/examples](https://github.com/mrdoob/three.js/tree/master/examples) contains a long list of all the examples. They are kind of the documentation of Three.js, try
    them. They are the meat, if you like something, just look at the source:
    * Some of them are for ```\<canvas\>``` rendering, most of them are for WebGL. Three.js is able to render 3D scene
      on canvas, DOM, SVG and obviously WebGL (with various level of support).
      See [list of renderers](https://github.com/mrdoob/three.js/tree/master/src/renderers) for details.
    * Some are focused on [geometry](https://github.com/mrdoob/three.js/tree/master/src/extras/geometries) i.e.
      the shape of the objects. See examples of:
      [colors](http://mrdoob.github.com/three.js/examples/webgl_geometry_colors.html) and a
      [cube](http://mrdoob.github.com/three.js/examples/canvas_geometry_cube.html).
    * Some are focused on the [material](https://github.com/mrdoob/three.js/tree/master/src/materials) i.e.
      the colors, reflectivity and the texture of the object. See examples of:
      [texture filters](http://mrdoob.github.com/three.js/examples/webgl_materials_texture_filters.html) and
      [normal map](http://mrdoob.github.com/three.js/examples/webgl_materials_normalmap.html).
    * Others are focused on [lighting](https://github.com/mrdoob/three.js/tree/master/src/lights), there are different
      types of light sources. See examples of:
      [point light](http://mrdoob.github.com/three.js/examples/canvas_lights_pointlights.html),
      [point light smooth](http://mrdoob.github.com/three.js/examples/canvas_lights_pointlights_smooth.html) and
      [more point lights](http://mrdoob.github.com/three.js/examples/webgl_lights_pointlights.html)

So once again, just fire up a web server, and go to the ```/examples``` directory to try them. It's fun!