+++
css = "css/blog.min.css"
date = "2013-06-16"
page_name = "Blog"
title = "CSS Day 2013 Amsterdam"
description = "Friday 14 june in Amsterdam I attended the CSSDay conference. Eight experts talked about 8 different CSS modules. The focus was on techniques of these modules we might not know about and the future of CSS. During the conference I learned that CSS is in very active development. It was an incredible, informative and awesome day. An high standard conference I've ever attended so far. I hope that there will be another one within 1 or 2 years."
+++

Friday 14 june 2013 in Amsterdam I attended the CSSDay conference. Eight experts talked about 8 different CSS modules. The focus was on techniques of these modules we might not know about and the future of CSS. During the conference I learned that CSS is in very active development. It was an incredible, informative and awesome day. An high standard conference I've ever attended so far. I hope that there will be another one within 1 or 2 years.

## Summary

Peter Paul Koch was the host of the day. Eric Meyer started the conference with his talk about fonts. Showing us a couple of creative ways to use different font types and browser quirks. Bert Bos, one of the people who invented CSS, talked about the history of CSS and the use of selectors. I didn't know that CSS was intended for simple documents with high quality typography. Stephen Hay gave a great, humouristic presentation about the power of Flexbox. Divya Manian showed us some really awesome demos of using filters and compositing. Tab Atkins talked about variables and conditional rules we hopefully can use in the near future. Daniel glazman gave an in-depth presentation about [media-queries](http://w3c.org/tr/css3-mediaqueries) and shared his thoughts about future specifications. Peter Gaston presented in-detail all the properties and values of transitions and browser quirks.And Finally Lea Verou closed the conference with an enlightning demonstration of border radius. She demonstrated the possibilities and behaviors you probably wouldn't think of when using border-radius.

Below you'll find my notes of the conference. When the videos are available I will add the links in this post.

## Fonts - Erik Meyer

When using @font-face the browser will always download the fonts required, even when the user has that font on its machine. You can avoid this to add src: local("font name") to @font-face. When the user has the font on its local machine it will use that one. Example:

<pre rel="CSS">
<code class="css">
@font-face {
  font-family: "Helvetica W01 Bold";
  src: url("fonts/f70da45a-a05c-490c-ad62-7db4894b012a.eot?#iefix");
  src: local("Helvetica W01 Bold"),
        url("fonts/f70da45a-a05c-490c-ad62-7db4894b012a.eot?#iefix") format("eot"),
  /* etc... */
}</code></pre>

Giving the font-family a short name will save a few bites. Although when you use Helvetica don't use the short name H because Microsoft will display it as Arial(?).<br>

<p>You can also use unicode-range property:</p>

<pre rel="CSS">
<code class="css">
@font-face</span> {
  font-family: STIXGeneral;
  src: local(STIXGeneral), url(/stixfonts/STIXGeneral.otf);
      unicode-range: U+000-49F, U+2000-27FF, U+2900-2BFF, U+1D400-1D7FF;
}
</code>
</pre>

## CSS Selectors - Bert Bos

The goal of CSS is to style text, applicable to formats that are tree-structured and to be format independent. For example, when HTML dies, it can be used for another format.

However, the web/world is changing, there is no standard language for GUIs. We use HTML + CSS instead. This changes the focus of CSS from styling high quality typography to complex books, magazines and complex GUIs. Bert mentioned some selectors I didn't know and a few selector proposals:

* @page, @top are also selectors for pages and running headers.
* form control parts: ::value, ::choices
* proposal: list markers, footnote markers ::marker
* proposal: templates/regions:  ::slot(), ::column(), @region

A good list of selectors with explanation can be found on:

* [w3schools](http://www.w3schools.com/cssref/css_selectors.asp)
* [tutsplus](http://net.tutsplus.com/tutorials/html-css-techniques/the-30-css-selectors-you-must-memorize/)

## Flexbox - Stephen Hay
<blockquote>
  One giant leap for web layout.
  <cite>- Stephen Hay</cite>
</blockquote>

Flexbox has been rewritten multiple times, at the time of writing it has the Candidate Recommendation. Flexbox is for creating interfaces, not really suitable for layouts.
Flexbox has 12 properties. When using flex box, don't think in left to right or top to bottom, because it can go both ways. It has no fixed start or end point.

For more information about Flexbox, check out the following documentation:

<ul>
  <li><a href="http://css-tricks.com/old-flexbox-and-new-flexbox/">Old and new flexbox</a></li>
  <li><a href="http://coding.smashingmagazine.com/2013/05/22/centering-elements-with-flexbox/">Smashing magazine</a></li>
  <li><a href="http://www.w3.org/TR/css3-flexbox/#overview-example">w3c.org css3 flexbox</a> </li>
</ul>
## Filter effects &amp; compositing - Divya Manian

SVG filters are introduced by Adobe and work in Chrome and Safari. A filter changes the pixels of an element and creates a new stacking context. "Filter effects are a way of processing an element's rendering before it is displayed in the document. They are triggered by a style instruction (the ‘filter’ property)." <a href="https://dvcs.w3.org/hg/FXTF/raw-file/tip/filters/index.html">w3c.org filters</a>

There are 3 types of filters:
<ul>
  <li>built-in filters: support in Chrome, Safari and Opera 15+</li>
  <li>svg filters: IE10, Firefox with no prefixes. Chrome, Safari and Opera with prefixes</li>
  <li>custom filters</li>
</ul>

Built-in filters are: blur, brightness, contrast, drop-shadow, grayscale, hue-rotate, invert, opacity, saturate and sepia.

Syntax example:

<pre rel="CSS">
<code class="css">
.box { -webkit-filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.5)) sepia(100%); }
</code>
</pre>

The difference between the CSS box-shadow property and filter drop-shadow, is that the drop-shadow() filter operates on the entire element.

You can experiment with filters and compositing (in Photoshop known as blend modes) on adobe's <a href="http://html.adobe.com/webplatform/graphics/customfilters/cssfilterlab/">cssfilterlab</a>. You do need Safari or Chrome. More information about filters and blend modes can be found on:

<ul>
  <li><a href="http://nimbu.in/cssday/#/step-1">Divya's slides</a></li>
  <li><a href="https://dvcs.w3.org/hg/FXTF/raw-file/tip/filters/index.html">W3C.org Filter Effects</a></li>
  <li><a href="http://adobe.github.io/web-platform/demos/compositing/">Adobe github</a></li>
</ul>
## Variables &amp; conditionals - Tab Atkins

Variables have been the number one developer request since 1998 but they all failed. With Frameworks like SASS and LESS we can use variables now. The CSS Working Group keeps an eye on what's happening around them. They do not tend to reinvent the wheel.

The specification is written and maintained by Tab Atkins and is still in working draft. Tab is creating a variable type which will be an addition to the variables in LESS/SASS. His new style is limited, you can use it in properties but not in media queries or selectors. However, he says it is very useful for web component theming. For Example:

<pre rel="CSS">
<code class="css">
:root { var-main-color: #000; }

.foo { color: var(main-color); }
</code>
</pre>

Tab Atkins also showed how to use calculations and a variable like pi.

<pre rel="CSS">
<code class="css">
:root {
    var-phi: 1.618;
    var-pi: 3.14159;
}

.foo { width: calc(300px * var(phi)); }
</code>
</pre>


An example of a conditional rule is @supports. With @supports you can test whether a property is supported or not. It is similar to Modernizr and other similar libraries.

<pre rel="CSS">
<code class="css">
@supports (display: flex) {
    body, #navigation, #article {
        display: flex;
        width: auto;
    }
}
</code>
</pre>

All the features Tab showed us, really made me wanting it implemented tomorrow. You can find his slides on: <a href="http://www.xanthir.com/talks/2013-06-14">xanthir.com</a> (use chrome and your arrow keys to navigate).

## Animations &amp; Transitions - Peter Gaston

2007 Safari6 introduces animations and transitions via CSS. But at the moment it is still buggy. With animation you have to specify every keyframe, otherwise the element will be set to its default setting. You can also transition the selectors ::after and ::before, except in Safari6. Transition on gradients don't work.

Performance:

<ul>
  <li>Chrome uses graphics acceleration but Safari, especially for iOS, you must force it with this hack: -webkit-transition: rotateY(0deg)</li>
  <li>CSS is better for performance than using jQuery animations.</li>
</ul>

Peter also showed us examples of specs violation, things that were in the specs but not applied in browsers.

Peter's slides are on <a href="https://speakerdeck.com/stopsatgreen/animations-and-transitions">speakerdeck</a>. You can also check out some nice animation/transition demos on
   <a href="http://tympanus.net/Development/PseudoElementsAnimationsTransitions/index3.html">
       tympanus.net
   </a>.

## The humble border radius - Lea verou

What you specify is not always what you get. If the border radius doesn't fit, all borders will apply the changes, they reduce proportionally. You cannot combine outline with border-radius, to fake an outline use box-shadow property.

### border-radius and text

css-shapes future specification: shape-inside: rectangle(0,0,100%, 100%, 50px 50px); With this property the text in the element with border-radius will follow its shape.


More information about border-radius, border-corner-shape and corners:

<ul>
  <li><a href="webplatform.org/css/properties/border-radius">webplatform border radius</a></li>
  <li><a href="webplatform.org/css/properties/border-corner-shape">webplatform border corner shape</a></li>
  <li><a href="w3.orgTR/css3-background/#corners">w3.org corners</a></li>
</ul>

The layout of the presentation really made me happy, nice colors and beautiful layout. Amazing how she talks and do live coding at once. I attended her talk last year at Fronteers Conference, that was already awesome and this time she pulled it off again.

<ul>
  <li><a href="http://github.com/leaverou/csss">Lea's presentation framework</a></li>
  <li><a href="http://lea.verou.me/humble-border-radius">Lea's presentation</a></li>
</ul>