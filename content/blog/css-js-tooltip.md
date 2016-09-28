+++
css = "css/blog.min.css"
date = "2016-09-28"
page_name = "Blog"
title = " A vanilla js and css tooltip"
description = "In february 2016 I was looking for a tooltip plugin which must fix 2 design issues: overflow:hidden and the window corners. I also don't want to need jQuery. During searching and testing I thought, why not build one myself? It is a fun way to learn more about javascript and css animations."
+++

In february 2016 I was looking for a tooltip plugin which must fix 2 design
issues: overflow:hidden and the window corners. I also don't want to need jQuery.
During searching and testing a couple plugins, I thought, why not build one myself?
It is a fun way to learn more about javascript and css animations.

In the same month I was also reading the book: *this & Object prototypes*, from
the series *You don't know javascript*. With this book I learned how to create
objects and used this technique for the tooltip.

<h2>tooltip.create:</h2>
The javascript searches for the *tooltip-container* element.
This container is an empty element where the tooltip text will be injected.

Based on the position of the tooltip item in the viewport, the class names:
*tooltip-left, tooltip-right* or *tooltip-center* are set on the tooltip-container.

<h2>tooltip.position:</h2>
The tooltip container gets positioned on the left, right or center bottom side
of the tooltip item. I calculate its position using *getBoundingClientRect()* function.

If the tooltip item is positioned near the edges of left or right side of the viewport
the tooltip, will appear on the right or left side of the tooltip item. In
other cases the tooltip appears right below the tooltip item.

<pre class="language-js" rel="Javascript"><code><span class="function-label">var</span> <span class="variable">Tooltip</span> =  {
    <span class="property">create:</span> <span class="function-label">function</span>(tooltip, elm) {
        <span class="variable">elm_edges</span> = <span class="variable">elm</span>.getBoundingClientRect(); <span class="comment">// relative to the viewport</span>
        <span class="variable">tooltip_text</span> = document.createTextNode(<span class="variable">elm</span>.getAttribute(<span class="selector">'data-tooltip'</span>));
        <span class="variable">tooltip</span>.appendChild(<span class="variable">tooltip_text</span>);

        <span class="comment">// Remove no-display + set the correct classname based on the position
        // of the elm.</span>
        <span class="function-label">if</span> (<span class="variable">elm_edges</span>.<span class="type">left</span> > (<span class="type">window</span>.<span class="type">innerWidth</span> - 100)) {
            <span class="variable">tooltip</span>.<span class="type">className</span> = <span class="selector">'tooltip-container tooltip-left'</span>;
        } <span class="function-label">else if</span> ((<span class="variable">elm_edges</span>.<span class="type">left</span> + (<span class="variable">elm_edges</span>.<span class="type">width</span> / 2)) < 100) {
            <span class="variable">tooltip</span>.<span class="type">className</span> = <span class="selector">'tooltip-container tooltip-right'</span>;
        } <span class="function-label">else</span> {
            <span class="variable">tooltip</span>.<span class="type">className</span> = <span class="selector">'tooltip-container tooltip-center'</span>;
        }
    },
    <span class="property">position:</span> <span class="function-label">function</span>(tooltip, elm) {
        <span class="function-label">var</span> <span class="variable">elm_top</span> = <span class="variable">elm_edges</span>.<span class="type">top</span> + <span class="variable">elm_edges</span>.<span class="type">height</span> + 10; <span class="comment">// 10 = arrow height</span>

        <span class="comment">// position tooltip on the left side of the elm.
        // 220 = the max width + arrow width of the tooltip.</span>
        <span class="function-label">if</span> (<span class="variable">elm_edges</span>.<span class="type">left</span> > (<span class="type">window</span>.<span class="type">innerWidth</span> - 100)) {
            <span class="variable">tooltip</span>.<span class="type">style</span>.<span class="type">left</span> = (<span class="variable">elm_edges</span>.<span class="type">left</span> - 220) + <span class="unit">'px'</span>;
            <span class="variable">tooltip</span>.<span class="type">style</span>.<span class="type">top</span> = <span class="variable">elm</span>.<span class="type">offsetTop</span> + <span class="unit">'px'</span>;
        } <span class="function-label">else if</span> ((<span class="variable">elm_edges</span>.<span class="type">left</span> + (<span class="variable">elm_edges</span>.<span class="type">width</span> / 2)) < 100) {
            <span class="comment">// position tooltip on the right side of the elm.</span>
            <span class="variable">tooltip</span>.<span class="type">style</span>.<span class="type">left</span> = (<span class="variable">elm_edges</span>.<span class="type">left</span> + <span class="variable">elm_edges</span>.<span class="type">width</span> + 20) + <span class="unit">'px'</span>;
            <span class="variable">tooltip</span>.<span class="type">style</span>.<span class="type">top</span> = <span class="variable">elm</span>.<span class="type">offsetTop</span> + <span class="unit">'px'</span>;
        } <span class="function-label">else</span> {
            <span class="comment">// Position the toolbox in the center of the elm.</span>
            <span class="function-label">var</span> <span class="variable">centered</span> = (<span class="variable">elm_edges</span>.<span class="type">left</span> + (<span class="variable">elm_edges</span>.<span class="type">width</span> / 2)) - (<span class="variable">tooltip</span>.<span class="type">offsetWidth</span> / 2);
            <span class="variable">tooltip</span>.<span class="type">style</span>.<span class="type">left</span> = <span class="variable">centered</span> + <span class="unit">'px'</span>;
            <span class="variable">tooltip</span>.<span class="type">style</span>.<span class="type">top</span> = <span class="variable">elm_top</span> + <span class="unit">'px'</span>;
        }
    },
};
</code></pre>

With the functions *showTooltip* and *hideTooltip* the tooltip is visible or
hidden, using the EventListeners *mouseover* and *mouseout*.

<pre rel="Javascript" class="language-js"><code><span class="function-label">function</span> <span class="property">showTooltip</span>(evt) {
    <span class="function-label">var</span> <span class="variable">item</span> = Object.create(<span class="variable">Tooltip</span>);
    <span class="variable">item</span>.<span class="property">create</span>(<span class="variable">tooltip</span>, evt.currentTarget);
    <span class="variable">item</span>.<span class="property">position</span>(<span class="variable">tooltip</span>, evt.currentTarget);
}

<span class="function-label">function</span> <span class="property">hideTooltip</span>() {
    <span class="variable">tooltip</span>.<span class="type">className</span> = <span class="selector">'tooltip-container no-display'</span>;
    <span class="variable">tooltip</span>.removeChild(<span class="variable">tooltip</span>.firstChild);
    <span class="variable">tooltip</span>.removeAttribute(<span class="selector">'style'</span>);
}

<span class="function-label">function</span> <span class="property">onReady</span>() {
    <span class="variable">tooltip</span> = document.documentElement.querySelector(<span class="selector">'.tooltip-container'</span>);
    <span class="function-label">var</span> <span class="variable">tooltip_elms</span> = document.documentElement.querySelectorAll(<span class="selector">'[data-tooltip]'</span>);

    Array.prototype.forEach.call(tooltip_elms, function(elm) {
        <span class="variable">elm</span>.addEventListener(<span class="selector">'mouseover'</span>,  showTooltip , false);
        <span class="variable">elm</span>.addEventListener(<span class="selector">'mouseout'</span>, hideTooltip, false);
    });
}
</code></pre>

The CSS handles the tooltip animation using animation keyframes.
The class names *tooltip-left, tooltip-right* and *tooltip-center* positions the
tooltip arrow.

<pre class="language-scss" rel="SCSS"><code><span class="selector">.tooltip-container</span> {
    <span class="include">@include transform(translateZ(0))</span>; <span class="comment">// GPU</span>
    <span class="property">position</span>: absolute;
    <span class="property">max-width</span>: 200px;
    <span class="property">padding</span>: 8px 10px 10px;
    <span class="property">font-size</span>: 1.6rem;
    <span class="property">background-color</span>: #2d2d2d;
    <span class="property">color</span>: #fff;
    <span class="property">border-radius</span>: 4px;
    <span class="property">opacity</span>: 1; <span class="comment">// scale animation setting</span>

    &<span class="selector">[class*=" tooltip-"]</span> {
        <span class="include">@include animation(tooltip-anim 0.8s)</span>;
    }

    &<span class="selector">::after</span> {
        <span class="property">position</span>: absolute;
        <span class="property">display</span>: block;
        <span class="property">content</span>: "";
    }

    <span class="comment">// position arrow on the right of the tooltip</span>
    &<span class="selector">.tooltip-left::after</span> {
        <span class="include">@include transform(translateY(-50%))</span>;
        <span class="property">right</span>: -8px;
        <span class="property">top</span>: 50%;
        <span class="property">border</span>: {
            <span class="property">style</span>: solid;
            <span class="property">width</span>: 6px 0 6px 8px;
            <span class="property">color</span>: transparent transparent transparent #2d2d2d;
        }
    }

    <span class="comment">// position arrow on the left of the tooltip</span>
    &<span class="selector">.tooltip-right::after</span> {
        <span class="include">@include transform(translateY(-50%))</span>;
        <span class="property">left</span>: -8px;
        <span class="property">top</span>: 50%;
        <span class="property">border</span>: {
            <span class="property">style</span>: solid;
            <span class="property">width</span>: 6px 8px 6px 0;
            <span class="property">color</span>: transparent #2d2d2d transparent transparent;
        }
    }

    <span class="comment">// position arrow in the top center of the tooltip</span>
    &<span class="selector">.tooltip-center::after</span> {
        <span class="include">@include transform(translateX(-50%))</span>;
        <span class="property">top</span>: -8px;
        <span class="property">left</span>: 50%;
        <span class="property">border</span>: {
            <span class="property">style</span>: solid;
            <span class="property">width</span>: 0 6px 8px 6px;
            <span class="property">color</span>: transparent transparent #2d2d2d transparent;
        }
    }
}

<span class="selector">[data-tooltip]</span> {
    <span class="property">cursor</span>: pointer;
    <span class="property">color</span>: #7cb342;
    <span class="property">display</span>: inline-block;
}

<span class="include">@include keyframes(tooltip-anim)</span> {
    0% {
        <span class="include">@include transform(matrix(0.5, 0, 0, 0.8, 0, 0))</span>;
        <span class="property">opacity</span>: 0;
    }

    20% { <span class="include">@include transform(matrix(1.1, 0, 0, 1.1, 0, 0))</span>; }
    40% { <span class="property">opacity</span>: 1; }
    70% { <span class="include">@include transform(matrix(1, 0, 0, 1, 0, 0))</span>; }
    100% { <span class="include">@include transform(matrix(1, 0, 0, 1, 0, 0))</span>; }
}</code></pre>

As you can see, not much code is written to get the tooltip to work. The complete
code can be found on my <a href="https://github.com/mirelvt/js-css-tooltip">github page</a>
and I also created a simple demo page <a href="http://www.mirellavanteulingen.nl/demos/tooltip/">demo page</a>.