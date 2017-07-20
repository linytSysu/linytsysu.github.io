---
layout: post
title: A tale of two viewports - part one
summary: 
tags: [viewport, html, css]
---

[https://www.quirksmode.org/mobile/viewports.html](https://www.quirksmode.org/mobile/viewports.html)


## Device pixels and CSS pixels
Device pixels are the kind of pixels we intuitively assume to be “right.” These pixels give the formal resolution of whichever device you’re working on, and can (in general) be read out from `screen.width/height`.
设备像素就是我们直觉上的像素。这些像素为你使用的设备上提供的正规的分辨率，其值能够从`screen.width/height`读取。

Zooming as implemented in modern browsers consists of nothing more than “stretching up” pixels.
现代浏览器实现缩放的方式都是“拉伸像素”。例如：当一个width为128px的元素被放大200%时，形式上，该元素的width仍然为128个CSS像素，但是它占据了256个设备像素。

Four pixels on 100% zoom level: CSS pixels fully overlap with device pixels

![100%-zoom-level](http://7u2fpc.com1.z0.glb.clouddn.com/linytsysu/github/io/2017/06/26/csspixels_100.gif)

Zoom out: The CSS pixels start to shrink, meaning that one device pixel now overlaps several CSS pixels.

![zoom-in](http://7u2fpc.com1.z0.glb.clouddn.com/linytsysu/github/io/2017/06/26/csspixels_out.gif)

Zoom in: the opposite happens. The CSS pixels start to grow, and now one CSS pixels overlaps several device pixels
100% zoom: At zoom level 100% one CSS pixel is exactly equal to one device pixel.

![zoom-out](http://7u2fpc.com1.z0.glb.clouddn.com/linytsysu/github/io/2017/06/26/csspixels_in.gif)

## Screen size
`screen.width/height`:
+ **Meaning** Total size of the user’s screen.

+ **Measured** in Device pixels

+ **Browser** errors IE8 measures it in CSS pixels, in both IE7 and IE8 mode.

![screen-size](http://7u2fpc.com1.z0.glb.clouddn.com/linytsysu/github/io/2017/06/26/desktop_screen.jpg)


## Window size
`window.innerWidth/Height`:
+ **Meaning** Total size of the browser window, including scrollbars.

+ **Measured in** CSS pixels

+ **Browser errors** Not supported by IE. Opera measures it in device pixels.

![window-size](http://7u2fpc.com1.z0.glb.clouddn.com/linytsysu/github/io/2017/06/26/desktop_inner.jpg)

## Scrolling offset
`window.pageX/YOffset`:
+ **Meaning** Scrolling offset of the page.

+ **Measured in** CSS pixels

+ **Browser errors** None

![window-size](http://7u2fpc.com1.z0.glb.clouddn.com/linytsysu/github/io/2017/06/26/desktop_page.jpg)


## Concept: the viewport
The function of the viewport is to constrain the <html> element, which is the uppermost containing block of your site.

In theory, the width of the <html> element is restricted by the width of the viewport. The <html> element takes 100% of the width of that viewport.
理论上，<html>元素的宽度被viewport所限定。

The viewport, in turn, is exactly equal to the browser window: it’s been defined as such. The viewport is not an HTML construct, so you cannot influence it by CSS. It just has the width and height of the browser window — on desktop. On mobile it’s quite a bit more complicated.
viewport，接着，实际上等于浏览器窗口：它就是那么定义的。viewport不是一个HTML结构，所以你不能用CSS来改变它。它在桌面环境下只是拥有浏览器窗口的宽度和高度。在移动环境下它会有一些复杂。

## Measuring the viewport
`document.documentElement.clientWidth/Height`:
+ **Meaning** Viewport dimensions

+ **Measured in** CSS pixels

+ **Browser errors** None

![window-size](http://7u2fpc.com1.z0.glb.clouddn.com/linytsysu/github/io/2017/06/26/desktop_client.jpg)

## Measuring the `<html>` element
`document.documentElement.offsetWidth/Height`:
+ **Meaning** Dimensions of the <html> element (and thus of the page).
+ **Measured in** CSS pixels
+ **Browser errors** IE measures the viewport, and not the <html> element.

![window-size](http://7u2fpc.com1.z0.glb.clouddn.com/linytsysu/github/io/2017/06/26/desktop_offset.jpg)

## Event coordinates
+ `pageX/Y` gives the coordinates relative to the <html> element in CSS pixels

+ `clientX/Y` gives the coordinates relative to the viewport in CSS pixels

+ `screenX/Y` gives the coordinates relative to the screen in device pixels

![window-size](http://7u2fpc.com1.z0.glb.clouddn.com/linytsysu/github/io/2017/06/26/desktop_pageXY.jpg)
![window-size](http://7u2fpc.com1.z0.glb.clouddn.com/linytsysu/github/io/2017/06/26/desktop_clientXY.jpg)
![window-size](http://7u2fpc.com1.z0.glb.clouddn.com/linytsysu/github/io/2017/06/26/desktop_screenXY.jpg)


## Media queries
There are two relevant media queries: `width/height` and `device-width/device-height`:
1. `width/height` uses the same values as `documentElement.clientWidth/Height` (the viewport, in other words). It works with CSS pixels.

2. `device-width/device-height` uses the same values as `screen.width/height` (the screen, in other words). It works with device pixels.

![window-size](http://7u2fpc.com1.z0.glb.clouddn.com/linytsysu/github/io/2017/06/26/desktop_mediaqueries.jpg)
