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

## Lets configure it and add some variables

First we need to store the values of the variables, lets call that ```params```. It may be ```this``` too, it depends
of your personal style of code.

    var params = {
        interation: 5000
    };

Let add a variable name ```interation``` to the widget.

    gui.add(params, 'interation')

It will add a line in the GUI widget.
*dat.gui* will see ```params.iteration``` is a Number and thus *guess* you want to display a slider for it.
If it is a function, it will be interpreted as a button and call params.foobar() on click.

## lets custom it some more

If the user changes the value with the mouse, the value of ```params.iteration```
will be changed accordingly. Up to you to know what to do with it.

You may be easy notified of user change with callbacks

    gui.add(params, 'interation').onFinishChange(function(){
        // refresh based on the new value of params.interation
    })


You can customize further if needed. To change the label displayed on the variable line, use ```.name("better label")```

    gui.add(params, 'interation').name('Intertions')

You can set up min/max limits and steps. This one will allows values from
128 to 256, only if they are multiple of 16

    gui.add(params, 'width').min(128).max(256).step(16)

