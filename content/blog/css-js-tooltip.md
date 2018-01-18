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

If the tooltip item is positioned near the edges of the left or right side of the viewport,
the tooltip will appear on the right or left side of the tooltip item. In
other cases the tooltip appears right below the tooltip item.

<pre rel="Javascript">
<code class="javascript">
var Tooltip =  {
    create: function(tooltip, elm) {
        elm_edges = elm.getBoundingClientRect(); // relative to the viewport
        tooltip_text = document.createTextNode(elm.getAttribute('data-tooltip'));
        tooltip.appendChild(tooltip_text);

        // Remove no-display + set the correct classname based on the position
        // of the elm.
        if (elm_edges.left > (window.innerWidth - 100)) {
            tooltip.className ='tooltip-container tooltip-left';
        } else if ((elm_edges.left + (elm_edges.width / 2)) < 100) {
            tooltip.className = 'tooltip-container tooltip-right';
        } else {
            tooltip.className = 'tooltip-container tooltip-center';
        }
    },
    position: function(tooltip, elm) {
        var elm_top = elm_edges.top + elm_edges.height + 10; // 10 = arrow height

        // position tooltip on the left side of the elm.
        // 220 = the max width + arrow width of the tooltip.
        if (elm_edges.left > (window.innerWidth - 100)) {
            tooltip.style.left = (elm_edges.left - 220) + 'px';
            tooltip.style.top = elm.offsetTop + 'px';
        } else if ((elm_edges.left + (elm_edges.width / 2)) < 100) {
            // position tooltip on the right side of the elm.
            tooltip.style.left = (elm_edges.left + elm_edges.width + 20) + 'px';
            tooltip.style.top = elm.offsetTop + 'px';
        } else {
            // Position the toolbox in the center of the elm.
            var centered = (elm_edges.left + (elm_edges.width / 2)) - (tooltip.offsetWidth / 2);
            tooltip.style.left = centered + 'px';
            tooltip.style.top = elm_top + 'px';
        }
    },
};
</code>
</pre>

With the functions *showTooltip* and *hideTooltip* the tooltip is visible or
hidden, using the EventListeners *mouseover* and *mouseout*.

<pre rel="Javascript">
<code class="Javascript">
function showTooltip(evt) {
    var item = Object.create(Tooltip);
    item.create(tooltip, evt.currentTarget);
    item.position(tooltip, evt.currentTarget);
}

function hideTooltip() {
    tooltip.className = 'tooltip-container no-display';
    tooltip.removeChild(tooltip.firstChild);
    tooltip.removeAttribute('style');
}

function onReady() {
    tooltip = document.documentElement.querySelector('.tooltip-container');
    var tooltip_elms = document.documentElement.querySelectorAll('[data-tooltip]');

    Array.prototype.forEach.call(tooltip_elms, function(elm) {
        elm.addEventListener('mouseover',  showTooltip , false);
        elm.addEventListener('mouseout', hideTooltip, false);
    });
}
</code>
</pre>

The CSS handles the tooltip animation using animation keyframes.
The class names *tooltip-left, tooltip-right* and *tooltip-center* positions the
tooltip arrow.

<pre rel="SCSS">
<code class="scss">
.tooltip-container {
    @include transform(translateZ(0)); // GPU
    position: absolute;
    max-width: 200px;
    padding: 8px 10px 10px;
    font-size: 1.6rem;
    background-color: #2d2d2d;
    color: #fff;
    border-radius: 4px;
    opacity: 1; // scale animation setting

    &[class*=" tooltip-"] {
        @include animation(tooltip-anim 0.8s);
    }

    &::after {
        position: absolute;
        display: block;
        content: "";
    }

    // position arrow on the right of the tooltip
    &.tooltip-left::after {
        @include transform(translateY(-50%));
        right: -8px;
        top: 50%;
        border: {
            style: solid;
            width: 6px 0 6px 8px;
            color: transparent transparent transparent #2d2d2d;
        }
    }

    // position arrow on the left of the tooltip
    &.tooltip-right::after {
        @include transform(translateY(-50%));
        left: -8px;
        top: 50%;
        border: {
            style: solid;
            width: 6px 8px 6px 0;
            color: transparent #2d2d2d transparent transparent;
        }
    }

    // position arrow in the top center of the tooltip
    &.tooltip-center::after {
        @include transform(translateX(-50%));
        top: -8px;
        left: 50%;
        border: {
            style: solid;
            width: 0 6px 8px 6px;
            color: transparent transparent #2d2d2d transparent;
        }
    }
}

[data-tooltip] {
    cursor: pointer;
    color: #7cb342;
    display: inline-block;
}

@include keyframes(tooltip-anim) {
    0% {
        @include transform(matrix(0.5, 0, 0, 0.8, 0, 0));
        opacity: 0;
    }

    20% { @include transform(matrix(1.1, 0, 0, 1.1, 0, 0)); }
    40% { opacity: 1; }
    70% { @include transform(matrix(1, 0, 0, 1, 0, 0)); }
    100% { @include transform(matrix(1, 0, 0, 1, 0, 0)); }
}
</code>
</pre>

As you can see, not much code is written to get the tooltip to work. The complete
code can be found on my <a href="https://github.com/mirelvt/js-css-tooltip">github page</a>
and I also created a simple <a href="http://www.mirellavanteulingen.nl/demos/tooltip/">demo page</a>.
