---
layout: post
title: A tale of two viewports - part two
summary: 
tags: [viewport, html, css]
---

[https://www.quirksmode.org/mobile/viewports2.html](https://www.quirksmode.org/mobile/viewports2.html)

The problem of mobile browsers
A mobile screen is far smaller than a desktop screen. The most important problems center on CSS, especially the dimensions of the viewport. If we’d copy the desktop model one-to-one, our CSS would start to misfire horrendously.

## The two viewports
The CSS layout, especially percentual widths, are calculated relative to the layout viewport, which is considerably wider than the visual viewport. CSS布局，尤其是百分比宽度，是以layout viewport做为参照系来计算的，它被认为要比visual viewport宽。

### Zooming
Both viewports are measured in CSS pixels, obviously. But while the visual viewport dimensions change with zooming (if you zoom in, less CSS pixels fit on the screen), the layout viewport dimensions remain the same. (If they didn’t your page would constantly reflow as percentual widths are recalculated.) 很显然两个viewport都是以CSS像素度量的。但是当进行缩放（如果你放大，屏幕上的CSS像素会变少）的时候，visual viewport的尺寸会发生变化，layout viewport的尺寸仍然跟之前的一样。（如果不这样，你的页面将会像百分比宽度被重新计算一样而经常被重新布局。）

### Understanding the layout viewport
Browsers have chosen their dimensions of the layout viewport such that it completely covers the screen in fully zoomed-out mode (and is thus equal to the visual viewport).

为了理解layout viewport的尺寸，我们不得不看一下当页面被完全缩小后会发生什么。许多移动浏览器会在初始情况下以完全缩小的模式来展示任何页面。
重点是：浏览器已经为自己的layout viewport选择了尺寸，这样的话它在完全缩小模式的情况下完整的覆盖了屏幕（并且等于visual viewport）。

![](http://7u2fpc.com1.z0.glb.clouddn.com/linytsysu/github/io/2017/06/29/mobile_viewportzoomedout.jpg)

Thus the width and the height of the layout viewport are equal to whatever can be shown on the screen in the maximally zoomed-out mode. When the user zooms in these dimensions stay the same.

![](http://7u2fpc.com1.z0.glb.clouddn.com/linytsysu/github/io/2017/06/29/mobile_layoutviewport.jpg)

## Measuring the layout viewport
`document.documentElement.clientWidth/Height`:
+ **Meaning** Layout viewport dimensions

+ **Measured in** CSS pixels

## Measuring the visual viewport
`window.innerWidth/Height`:
+ **Meaning** Visual viewport dimensions

+ **Measured in** CSS pixels

## Meta viewport
Meta viewport
+ **Meaning** Set the layout viewport’s width.

+ **Measured in** CSS pixels

1. Suppose you build a simple page and give your elements no width. Now they stretch up to take 100% of the width of the layout viewport. Most browsers zoom out to show the entire layout viewport on the screen, giving an effect like this:

    ![](http://7u2fpc.com1.z0.glb.clouddn.com/linytsysu/github/io/2017/06/29/mq_none.jpg)

2. All users will immediately zoom in, which works, but most browsers keep the width of the elements intact, which makes the text hard to read.

    ![](http://7u2fpc.com1.z0.glb.clouddn.com/linytsysu/github/io/2017/06/29/mq_none_zoomed.jpg)

3. Now what you could try is setting html {width: 320px}. Now the <html> element shrinks, and with it all other elements, which now take 100% of 320px. This works when the user zooms in, but not initially, when the user is confronted with a zoomed-out page that mostly contains nothing.

    ![](http://7u2fpc.com1.z0.glb.clouddn.com/linytsysu/github/io/2017/06/29/mq_html300.jpg)

4. It is in order to get around this problem that Apple invented the meta viewport tag. When you set `<meta name="viewport" content="width=320">` you set the width of the layout viewport to 320px. Now the initial state of the page is also correct.

    ![](http://7u2fpc.com1.z0.glb.clouddn.com/linytsysu/github/io/2017/06/29/mq_yes.jpg)