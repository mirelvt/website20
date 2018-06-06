+++
css = "css/blog.min.css"
date = "2018-06-03"
page_name = "Blog"
title = "Create SVG charts and animations without a JS Library"
description = "There are a lot of libraries around to create svg and svg animations like Greensock, Raphael, SnapSVG, SVG.js. In my case I want to see how far you get with basic browser support. In this article I will show you some simple svg solutions and the issues I bumped into during development."
+++

At Dreamsolution we need to visualize a lot of data using bar charts, pie charts, counters etc. Most of the time
we use the <a href="https://www.highcharts.com/">Highcharts</a> library for the charts. Now I had some use cases
where a library as Highcharts is overdone. The question was how can I create a simple pie and bar chart without
using a library (Highcharts, Greensock, Raphael, SnapSVG and SVG.js)?


## Use case: pie chart, bar chart
The designer already created a mockup how the bar and pie chart should look like, only thing
I need to do is to make it work on the web. The values for the charts come from the database, so
using CSS animations in a separate file would not do the trick. (Unless you can serve your solution to the latest greatest browers,
using CSS custom properties).

You can also use inline CSS to be able to work with dynamic values,
but if you have a <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP">CSP</a> in place,
then inline CSS are blocked due to security reasons.

It was time to start playing with <a href="https://www.w3.org/TR/SVG/animate.html#RelationshipToSMILAnimation">SMIL</a>.

## Pie chart
I create a pie chart and animate the stroke-dasharray using the animate tag. Looks pretty clean and readable.

<pre rel="svg">
<code>
&lt;svg viewbox="0 0 400 400"&gt;
    &lt;!-- main circle --&gt;
    &lt;circle fill="#ccc" cx="200" cy="200" r="200" /&gt;
    &lt;!-- circle where the dash-stroke will be animated --&gt;
    &lt;circle cx="200" cy="200" r="160" transform="rotate(-90, 200, 200)"
            stroke-dasharray="0, 1000" stroke="#7cb342" data-fallback="edge"&gt;
        &lt;animate attributeName="stroke-dasharray" dur="1s"
                to="300,1000" fill="freeze" /&gt;
    &lt;/circle&gt;
    &lt;!-- Inner circle --&gt;
    &lt;circle cx="200" cy="200" r="160" fill="#fff" /&gt;
&lt;/svg&gt;
</code>
</pre>

### Demo pie chart:
<button data-trigger="startanimation">Start animation</button>
<div class="svg-piechart-example">
    <svg viewbox="0 0 400 400">
        <!-- main circle -->
        <circle fill="#ccc" cx="200" cy="200" r="200" />
        <!-- circle where the dash-stroke will be animated -->
        <circle cx="200" cy="200" r="160" transform="rotate(-90, 200, 200)"
                stroke-dasharray="0, 1000" stroke="#7cb342" stroke-width="80" data-fallback="edge">
            <animate attributeName="stroke-dasharray" dur="1s"
                    to="300,1000" fill="freeze" begin="startanimation" />
        </circle>
        <!-- Inner circle -->
        <circle cx="200" cy="200" r="160" fill="#fff" />
        <text x="115" y="230" textAnchor="middle" font-size="100" fill="#3c4946">30%</text>
    </svg>
</div>

If you also want the percentage (counter) be animated the code looks like this:

<pre rel="svg">
<code>
&lt;svg viewbox="0 0 400 400"&gt;
    &lt;defs&gt;
        &lt;!-- Clip path creates a clipping region that defines what part of
        an element should be displayed in svg.
        Only the correct portion of the text is shown, the rest is hidden.--&gt;
        &lt;clipPath id="counter-clippath"&gt;
            &lt;rect x="50" y="0" width="320" height="72" /&gt;
        &lt;/clipPath&gt;
    &lt;/defs&gt;
    &lt;!-- main circle --&gt;
    &lt;circle fill="#ccc" cx="200" cy="200" r="200" /&gt;
    &lt;!-- circle where the dash-stroke will be animated --&gt;
    &lt;circle cx="200" cy="200" r="160" transform="rotate(-90, 200, 200)"
            stroke-dasharray="0, 1000" stroke="#7cb342" stroke-width="80" data-fallback="edge"&gt;
        &lt;animate attributeName="stroke-dasharray" dur="1s"
                to="300,1000" fill="freeze" /&gt;
    &lt;/circle&gt;
    &lt;!-- Inner circle --&gt;
    &lt;circle cx="200" cy="200" r="160" fill="#fff" /&gt;
    &lt;g class="counter-clippath" clip-path="url(#counter-clippath)"
        transform="translate(0, 165)"&gt;
        &lt;g class="move-svg-text"&gt;
            &lt;animateTransform attributeName="transform" type="translate"
                dur="1s" calcMode="discrete" values="0 0; 0 -90; 0 -180; 0 -270; 0 -360; 0 -450; 0 -540" fill="freeze" /&gt;
            &lt;text x="200" y="70" text-anchor="middle" font-size="100" fill="#3c4946"&gt;1%&lt;/text&gt;
            &lt;text x="200" y="160" text-anchor="middle" font-size="100" fill="#3c4946"&gt;3%&lt;/text&gt;
            &lt;text x="200" y="250" text-anchor="middle" font-size="100" fill="#3c4946"&gt;5%&lt;/text&gt;
            &lt;text x="200" y="340" text-anchor="middle" font-size="100" fill="#3c4946"&gt;7%&lt;/text&gt;
            &lt;text x="200" y="430" text-anchor="middle" font-size="100" fill="#3c4946"&gt;9%&lt;/text&gt;
            &lt;text x="200" y="520" text-anchor="middle" font-size="100" fill="#3c4946"&gt;11%&lt;/text&gt;
            &lt;text x="200" y="610" text-anchor="middle" font-size="100" fill="#3c4946"&gt;13%&lt;/text&gt;
        &lt;/g&gt;
    &lt;/g&gt;
&lt;/svg&gt;
</code>
</pre>

<button data-trigger="startanimation">Start animation</button>
<div class="svg-piechart-example">
    <svg viewbox="0 0 400 400">
        <defs>
<!--             Clip path creates a clipping region that defines what part of
            an element should be displayed in svg.
            Only the correct portion of the text is shown, the rest is hidden.
            NOTE: Edge does not support svg animate (SMIL). See:
            https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/5254111/ -->
            <clipPath id="counter-clippath">
                <!-- <rect x="40" y="140" width="320" height="120" /> -->
                <rect x="50" y="0" width="320" height="72" />
            </clipPath>
        </defs>
        <!-- main circle -->
        <circle fill="#ccc" cx="200" cy="200" r="200" />
        <!-- circle where the dash-stroke will be animated -->
        <circle cx="200" cy="200" r="160" transform="rotate(-90, 200, 200)"
                stroke-dasharray="0, 1000" stroke="#7cb342" stroke-width="80" data-fallback="edge">
            <animate attributeName="stroke-dasharray" dur="1s"
                    to="300,1000" fill="freeze" begin="startanimation" />
        </circle>
        <!-- Inner circle -->
        <circle cx="200" cy="200" r="160" fill="#fff" />
        <g class="counter-clippath" clip-path="url(#counter-clippath)"
            transform="translate(0, 165)">
            <g class="move-svg-text">
                <animateTransform attributeName="transform" type="translate"
                    dur="1s" calcMode="discrete" begin="startanimation" values="0 0; 0 -90; 0 -180; 0 -270; 0 -360; 0 -450; 0 -540" fill="freeze" />
                <text x="200" y="70" text-anchor="middle" font-size="100" fill="#3c4946">1%</text>
                <text x="200" y="160" text-anchor="middle" font-size="100" fill="#3c4946">3%</text>
                <text x="200" y="250" text-anchor="middle" font-size="100" fill="#3c4946">5%</text>
                <text x="200" y="340" text-anchor="middle" font-size="100" fill="#3c4946">7%</text>
                <text x="200" y="430" text-anchor="middle" font-size="100" fill="#3c4946">9%</text>
                <text x="200" y="520" text-anchor="middle" font-size="100" fill="#3c4946">11%</text>
                <text x="200" y="610" text-anchor="middle" font-size="100" fill="#3c4946">13%</text>
            </g>
        </g>
    </svg>
</div>


## Demo bar chart
The code for a simple bar chart:
<pre>
<code>
&lt;svg viewBox="0 0 190 165"&gt;
    &lt;g transform="translate(20, 0)"&gt;
        &lt;line class="barchart_line bar-1"
                x1="0" y1="150"
                x2="0" y2="0"
                stroke-width="19" stroke-dasharray="0, 150"&gt;
            &lt;animate attributeName="stroke-dasharray" dur="2s"
                    from="0, 150"
                    to="150, 150"
                    begin="startanimation+200ms"
                    fill="freeze" restart="whenNotActive" /&gt;
        &lt;/line&gt;
        &lt;text x="0" y="158" class="bar-legend" text-anchor="middle"&gt;14 may&lt;/text&gt;
    &lt;/g&gt;
    &lt;g transform="translate(45, 0)"&gt;
        &lt;line class="barchart_line bar-2"
                x1="0" y1="150"
                x2="0" y2="0"
                stroke-width="19" stroke-dasharray="0, 150"&gt;
            &lt;animate attributeName="stroke-dasharray" dur="2s"
                    from="0, 150"
                    to="50, 150"
                    begin="startanimation+400ms"
                    fill="freeze" restart="whenNotActive" /&gt;
        &lt;/line&gt;
        &lt;text x="0" y="158" class="bar-legend" text-anchor="middle"&gt;15 may&lt;/text&gt;
    &lt;/g&gt;
    &lt;g transform="translate(70, 0)"&gt;
        &lt;line class="barchart_line bar-3"
                x1="0" y1="150"
                x2="0" y2="0"
                stroke-width="19" stroke-dasharray="0, 150"&gt;
            &lt;animate attributeName="stroke-dasharray" dur="2s"
                    from="0, 150"
                    to="80, 150"
                    begin="startanimation+600ms"
                    fill="freeze" restart="whenNotActive" /&gt;
        &lt;/line&gt;
        &lt;text x="0" y="158" class="bar-legend" text-anchor="middle"&gt;16 may&lt;/text&gt;
    &lt;/g&gt;
    &lt;g transform="translate(95, 0)"&gt;
        &lt;line class="barchart_line bar-4"
                x1="0" y1="150"
                x2="0" y2="0"
                stroke-width="19" stroke-dasharray="0, 150"&gt;
            &lt;animate attributeName="stroke-dasharray" dur="2s"
                    from="0, 150"
                    to="110, 150"
                    begin="startanimation+800ms"
                    fill="freeze" restart="whenNotActive" /&gt;
        &lt;/line&gt;
        &lt;text x="0" y="158" class="bar-legend" text-anchor="middle"&gt;17 may&lt;/text&gt;
    &lt;/g&gt;
    &lt;g transform="translate(120, 0)"&gt;
        &lt;line class="barchart_line bar-5"
                x1="0" y1="150"
                x2="0" y2="0"
                stroke-width="19" stroke-dasharray="0, 150"&gt;
            &lt;animate attributeName="stroke-dasharray" dur="2s"
                    from="0, 150"
                    to="80, 150"
                    begin="startanimation+1000ms"
                    fill="freeze" restart="whenNotActive" /&gt;
        &lt;/line&gt;
        &lt;text x="0" y="158" class="bar-legend" text-anchor="middle"&gt;18 may&lt;/text&gt;
    &lt;/g&gt;
    &lt;g transform="translate(145, 0)"&gt;
        &lt;line class="barchart_line bar-6"
                x1="0" y1="150"
                x2="0" y2="0"
                stroke-width="19" stroke-dasharray="0, 150"&gt;
            &lt;animate attributeName="stroke-dasharray" dur="2s"
                    from="0, 150"
                    to="140, 150"
                    begin="startanimation+1200ms"
                    fill="freeze" restart="whenNotActive" /&gt;
        &lt;/line&gt;
        &lt;text x="0" y="158" class="bar-legend" text-anchor="middle"&gt;19 may&lt;/text&gt;
    &lt;/g&gt;
    &lt;g transform="translate(170, 0)"&gt;
        &lt;line class="barchart_line bar-7"
                x1="0" y1="150"
                x2="0" y2="0"
                stroke-width="19" stroke-dasharray="0, 150"&gt;
            &lt;animate attributeName="stroke-dasharray" dur="2s"
                    from="0, 150"
                    to="70, 150"
                    begin="startanimation+1400ms" fill="freeze" restart="whenNotActive" /&gt;
        &lt;/line&gt;
        &lt;text x="0" y="158" class="bar-legend" text-anchor="middle"&gt;20 may&lt;/text&gt;
    &lt;/g&gt;
&lt;/svg&gt;
</code>
</pre>

<button data-trigger="startanimation">Start animation</button>
<div class="svg-bar-example">
    <svg viewBox="0 0 190 165">
        <g transform="translate(20, 0)">
            <!-- reset bar -->
            <line class="barchart_line bar-1"
                    x1="0" y1="150"
                    x2="0" y2="0"
                    stroke-width="19" stroke-dasharray="0, 150">
                <animate attributeName="stroke-dasharray" dur="100ms"
                    from="0, 150" to="0, 150" begin="startanimation" restart="whenNotActive"
                    fill="freeze" />
                <animate attributeName="stroke-dasharray" dur="2s"
                        from="0, 150" to="150, 150"
                        begin="startanimation+200ms" restart="whenNotActive" fill="freeze" />
            </line>
            <text x="0" y="158" class="bar-legend" text-anchor="middle">14 may</text>
        </g>
        <g transform="translate(45, 0)">
            <line class="barchart_line bar-2"
                    x1="0" y1="150"
                    x2="0" y2="0"
                    stroke-width="19" stroke-dasharray="0, 150">
                <animate attributeName="stroke-dasharray" dur="100ms"
                    from="0, 150" to="0, 150" begin="startanimation" restart="whenNotActive"
                    fill="freeze" />
                <animate attributeName="stroke-dasharray" dur="2s"
                        from="0, 150" to="50, 150"
                        begin="startanimation+400ms" restart="whenNotActive" fill="freeze" />
            </line>
            <text x="0" y="158" class="bar-legend" text-anchor="middle">15 may</text>
        </g>
        <g transform="translate(70, 0)">
            <line class="barchart_line bar-3"
                    x1="0" y1="150"
                    x2="0" y2="0"
                    stroke-width="19" stroke-dasharray="0, 150">
                <animate attributeName="stroke-dasharray" dur="100ms"
                        from="0, 150" to="0, 150"
                        begin="startanimation" restart="whenNotActive" fill="freeze" />
                <animate attributeName="stroke-dasharray" dur="2s"
                        from="0, 150" to="80, 150"
                        begin="startanimation+600ms" restart="whenNotActive" fill="freeze" />
            </line>
            <text x="0" y="158" class="bar-legend" text-anchor="middle">16 may</text>
        </g>
        <g transform="translate(95, 0)">
            <line class="barchart_line bar-4"
                    x1="0" y1="150"
                    x2="0" y2="0"
                    stroke-width="19" stroke-dasharray="0, 150">
                <animate attributeName="stroke-dasharray" dur="100ms"
                        from="0, 150" to="0, 150"
                        begin="startanimation" restart="whenNotActive" fill="freeze" />
                <animate attributeName="stroke-dasharray" dur="2s"
                        from="0, 150" to="110, 150"
                        begin="startanimation+800ms" restart="whenNotActive" fill="freeze" />
            </line>
            <text x="0" y="158" class="bar-legend" text-anchor="middle">17 may</text>
        </g>
        <g transform="translate(120, 0)">
            <line class="barchart_line bar-5"
                    x1="0" y1="150"
                    x2="0" y2="0"
                    stroke-width="19" stroke-dasharray="0, 150">
                <animate attributeName="stroke-dasharray" dur="500ms"
                        from="0, 150" to="0, 150"
                        begin="startanimation" fill="freeze" />
                <animate attributeName="stroke-dasharray" dur="2s"
                        from="0, 150" to="80, 150"
                        begin="startanimation+1000ms" restart="whenNotActive" fill="freeze" />
            </line>
            <text x="0" y="158" class="bar-legend" text-anchor="middle">18 may</text>
        </g>
        <g transform="translate(145, 0)">
            <line class="barchart_line bar-6"
                    x1="0" y1="150"
                    x2="0" y2="0"
                    stroke-width="19" stroke-dasharray="0, 150">
                <animate attributeName="stroke-dasharray" dur="100ms"
                        from="0, 150" to="0, 150"
                        begin="startanimation" restart="whenNotActive" fill="freeze" />
                <animate attributeName="stroke-dasharray" dur="2s"
                        from="0, 150" to="140, 150"
                        begin="startanimation+1200ms" restart="whenNotActive" fill="freeze" />
            </line>
            <text x="0" y="158" class="bar-legend" text-anchor="middle">19 may</text>
        </g>
        <g transform="translate(170, 0)">
            <line class="barchart_line bar-7"
                    x1="0" y1="150"
                    x2="0" y2="0"
                    stroke-width="19" stroke-dasharray="0, 150">
                <animate attributeName="stroke-dasharray" dur="100ms"
                        from="0, 150" to="0, 150"
                        begin="startanimation" restart="whenNotActive" fill="freeze" />
                <animate attributeName="stroke-dasharray" dur="2s"
                        from="0, 150" to="70, 150"
                        begin="startanimation+1400ms" restart="whenNotActive" fill="freeze" />
            </line>
            <text x="0" y="158" class="bar-legend" text-anchor="middle">20 may</text>
        </g>
    </svg>
</div>

# Issues:
As you can see it is easy to create simple pie chart and bar chart svg with animation without using a library. However I did bump into some issues in Edge and Firefox.

It turns out that <a href="https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/5254111/">Microsoft Edge does not support SMIL</a>, while <a href="https://caniuse.com/#search=SMIL">other browsers</a> do.

If the animation is not a deal breaker you can set the end state of the stroke-dasharray for Edge by using Javascript. You check if SMIL is not supported and do your thing for IE, Edge:
<pre>
<code>
var has_smil = Boolean(document.createElementNS) &&
        (/SVGAnimate/).test(document.createElementNS('https://www.w3.org/2000/svg', 'animate'));
// fallback for IE + Edge which don't support SMIL animation. Set directly the elm end state.
if (!has_smil) {
    var elm = document.querySelector('[data-fallback="edge"]');
    var a = elm.querySelector('animate');
    var end_state = a.getAttribute('to');
    elm.setAttribute(a.getAttribute('attributeName'), end_state);
}
</code>
</pre>

### Firefox and CSP
When you are using CSP, you can get inline-css CSP error in Firefox when animating the following SVG attributes:

- stroke
- stroke-dasharray
- fill

Somehow Firefox renders these svg attributes used in the animation, as CSS. If you animate the width, or height of an svg element then Firefox has no issues. I reported this bug at <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1459872">Bugzilla</a>. Depending on your project you can use for Firefox the iframe workaround: load the svg in an iframe with a less strict CSP.

## Conclusion
Can you use SMIL for production sites? If you don't need to fully support Edge and can use the iframe workaround for Firefox when working with a CSP,
or if you use chromebit for narrowcasting, then yes you can. For cross browser support you still need a library.

I hope that in the near future all the major browsers will support SMIL. It is easy to use and <a href="https://www.w3.org/TR/SMIL3/">SMIL3.0</a> is available since 2008. For more examples go to <a href="https://css-tricks.com/guide-svg-animations-smil/">CSS Tricks</a>.


