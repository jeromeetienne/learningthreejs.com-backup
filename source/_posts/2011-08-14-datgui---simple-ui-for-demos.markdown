---
layout: post
title: "dat.gui - Simple UI for Demos"
date: 2011-08-14 19:42
comments: true
categories: [ui, demo]
---

[Dat.gui](http://code.google.com/p/dat-gui/)
is a GUI widget for your demos. It provide way for the user to set parameters of the
demo to play with it. It is simple to code, yet cool and minimalist on the screen.

{% img right /data/dat_gui_simple_ui_for_demos/datgui_integrated.png Integrated %}

## How to include it

Simply include the library file in your page. Download it [there](http://code.google.com/p/dat-gui)

    <script type='text/javascript' src='DAT.GUI.min.js'></script>

## How to use it

First initialize the object itself. It will create the widget and display it on the
screen top right corner. You can change this position if you wish (see ```autoplace```)
{% img right /data/dat_gui_simple_ui_for_demos/datgui_closeup.png Close up %}

    var gui = new DAT.GUI({
        height : 5 * 32 - 1
    });

Here is the visual result on the right.
The misterious ```height```parameter is the height of the widget. You have to set it manually.
In our case, we get 5 lines plus the close button.
The formula which worked for me has been ```nline * 32 - 1```.

## Some variables examples

This will add a variable named ```interval```. It will be display ```Intervals```
and will go from 0.001 and 0.1. If the name isnt explicitly specified, it is simply
the variable names.

    gui.add(params, 'interval').name('Interval').min(0.001).max(0.1)

It maybe usefull to setup a step, like when setting size in pixel, integer may be more
suitable. This will allows values from 128 to 256 but only integers.

    gui.add(params, 'width').min(128).max(256).step(1)

