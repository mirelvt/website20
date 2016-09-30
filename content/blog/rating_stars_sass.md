+++
css = "css/blog.min.css"
date = "2015-07-03"
page_name = "Blog"
title = "Create clickable rating stars with only SASS and HTML"
description = "In May, Roy Tomeij wrote the article 'Configurable star rating without JS'. I was thinking how to do this using a font icon instead of a background image and make the stars clickable. I believe it would take less code to write, and it is."
+++
In May, Roy Tomeij wrote the article <a href="http://advancedsass.com/articles/configurable-star-rating-without-js.html">"Configurable star rating without JS"</a>. I was thinking how to do this using a font icon instead of a background image and make the stars clickable. I believe it would take less code to write, and it is. I had the code finished a couple of days later in May, but now I've finally have the time to post my solution. So here we go:
<h3>HTML structure</h3>
<p>
I place the radio buttons in reversed order in the DOM to be able to do the hover + checked state in the right order with SASS. For the star I created a font icon using <a href="http://www.fontcustom.com">Fontcustom</a> and <a href="http://www.bohemiancoding.com/sketch/">Sketch</a>.
</p>
<p>I also add a "remove rating" option to be able to reset the rating.</p>

<pre rel="HTML">
<code>&lt;div class="remove-rating-wrapper"&gt;
    &lt;input type="radio" name="4 stars" id="remove-rating"&gt;
    &lt;label for="remove-rating"&gt;Remove rating&lt;/label&gt;
&lt;/div&gt;
&lt;div class="rating"&gt;
    &lt;input type="radio" name="4 stars" id="star-4"&gt;
    &lt;label for="star-4" class="icon-star"&gt;&lt;/label&gt;
    &lt;input type="radio" name="4 stars" id="star-3"&gt;
    &lt;label for="star-3" class="icon-star"&gt;&lt;/label&gt;
    &lt;input type="radio" name="4 stars" id="star-2"&gt;
    &lt;label for="star-2" class="icon-star"&gt;&lt;/label&gt;
    &lt;input type="radio" name="4 stars" id="star-1"&gt;
    &lt;label for="star-1" name="4 stars" class="icon-star"&gt;&lt;/label&gt;
&lt;/div&gt;
</code>
</pre>

<p>
First I hide the radio boxes using a negative margin. On the labels I add the class "icon-star", which triggers the icon font. Then I create a SASS map for the number of stars I want to show.
</p>

<pre rel="SCSS">
<code>
$stars-list: (
    1,
    2,
    3,
    4
);

.rating {
    position: relative;
    overflow: hidden;
    height: 32px;
    @include rating-stars($stars-list, 32px, orange, #f5d76d, 85);

    // Hide the radio buttons
    [type="radio"] { margin-left: -19px; }

    label { cursor: pointer; }
    .icon-star { font-size</span>: 3rem; }
}
</code>
</pre>

<p>
The rating stars mixin is where it all happens, it contains 4 arguments:
<ol>
<li>Number of stars</li>
<li>star width</li>
<li>hover color</li>
<li>selected color</li>
</ol>
The labels are positioned absolute and using a SASS loop, the stars can be positioned in the right order. Within the loop I use the sibling selector ~ to handle the hover and the selected state of the stars properly.
</p>

<pre rel="SCSS">
<code>
// Set hover + selected label for star rating</span>
@mixin rating-stars($stars, $star-width, $c-hover, $c-selected) {
    > label {
        position: absolute;
        top: 4px;

        &:hover { color: $hover; }
    }

    // Loop through the stars to position them in the right order,
    and set the hover + checked color
    @for $i from 1 through length($stars) {

        // position the stars in reversed order
        > label:nth-of-type(n + #{$i}) {
           left: ($star-width * length($stars)) - ($star-width * $i);
        }

        // Handle the hover
        > label:nth-of-type(n + #{$i}):hover ~ label { color: $hover; }

        // Set selected color on all label siblings based on the checked radio
        > input[type="radio"]:nth-of-type(n + #{$i}):checked ~ label {
            color: $selected;
        }
    }
}
</code>
</pre>

<h2>Demo</h2>
<p>And here a demo, as you can see it is not much code and it works in all latest browsers. I hope the article is meaningful to you.</p>
<div class="remove-rating-wrapper">
<input type="radio" name="4 stars" id="remove-rating">
<label for="remove-rating">Remove rating</label>
</div>
<div class="rating">
<input type="radio" name="4 stars" id="star-4">
<label for="star-4" class="icon-star"></label>
<input type="radio" name="4 stars" id="star-3">
<label for="star-3" class="icon-star"></label>
<input type="radio" name="4 stars" id="star-2">
<label for="star-2" class="icon-star"></label>
<input type="radio" name="4 stars" id="star-1">
<label for="star-1" name="4 stars" class="icon-star"></label>
</div>