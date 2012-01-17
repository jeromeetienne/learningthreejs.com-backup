---
layout: post
title: "Boilerplate Builder for three.js"
date: 2012-01-17 10:59
comments: true
published: true
categories: [three.js, library, boilerplate]
---

* previous [boilerplate for three.js](/blog/2011/12/20/boilerplate-for-three-js/)
* more flexibily
* very fast bootstrapping

* With time, we will see which options are relevant.
* Remove useless ones, adding useful ones.

## Making-Of the Builder

The
[builder](http://jeromeetienne.github.com/threejsboilerplatebuilder/)
itself was interesting to build.
It uses various nice features from the current web.
It includes
[twitter bootstrap](http://twitter.github.com/bootstrap/) for css.
I am quite grateful for this framework.
It makes it so easy to write a webapp which looks good on the screen.
I think all the css-impaired of the world should thanks twitter for its bootstrap framework :)

### Pure Browser Download

I like to write pure-browser application.
Thus there is no server to run, only static files.
It makes it much easier to host your aplication.
The
[builder](http://jeromeetienne.github.com/threejsboilerplatebuilder/)
has been written as a pure-browser application.
It uses
[jszip](http://jszip.stuartk.co.uk/)
, a library which create .zip files with Javascript.
Its creates the boilerplater.zip that you download.
Additionally, it uses
[downloadify](https://github.com/dcneiner/Downloadify)
, a small library to create and download files without server.

Together,
[jszip](http://jszip.stuartk.co.uk/)
and 
[downloadify](https://github.com/dcneiner/Downloadify)
makes it easy to pack several files together,
and allow the user to download it.
All that in pure-browser. cool stuff!
i love what the web is becoming.

### Boilerplate Preview

The preview is a bit more subtle.
We start to load the *index.html* template for the boilerplate.
We apply all the options you configured and produce the final version.
To actually preview this file, we encode it in
[base64](http://en.wikipedia.org/wiki/Base64)
to build a
[data url](http://en.wikipedia.org/wiki/Data_URI_scheme)
with it.
Only then, we create an iframe with this data uri
and you can see the webgl preview :)

[Data url](http://en.wikipedia.org/wiki/Data_URI_scheme)
is a new HTML5 feature.
It allows to encode data directly in the URL.
It may be used to include image directly in css for examples.
Very usefull but not for human consumption.
To give you an idea, here is [index.html](http://pastebin.com/yF3XDSFW) in as data url.
It looks like long ugly random string.

```
    data:text/html;base64,PCFkb2N0eXBlIGh0....
```

## Conclusion

That's all folks.
Have fun.


## Meta
* why the boilerplate
* why a builder
* what is available in the builder
* how you did it ?
  * jszip + downloadify to create the .zip
  * downloadify to download it in the browser
  * data base64 url index.html for the preview


