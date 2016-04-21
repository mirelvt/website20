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
<pre class="language-html" rel="HTML"><code>&lt;<span class="tag">div</span> <span class="attribute">class</span>="remove-rating-wrapper"&gt;
&lt;<span class="tag">input</span> <span class="attribute">type</span>="radio" <span class="attribute">name</span>="4 stars" <span class="attribute">id</span>="remove-rating"&gt;
&lt;<span class="tag">label</span> <span class="attribute">for</span>="remove-rating"&gt;Remove rating&lt;/<span class="tag">label</span>&gt;
&lt;/<span class="tag">div</span>&gt;
&lt;<span class="tag">div</span> class="rating"&gt;
&lt;<span class="tag">input</span> <span class="attribute">type</span>="radio" <span class="attribute">name</span>="4 stars" <span class="attribute">id</span>="star-4"&gt;
&lt;<span class="tag"><span class="tag">label</span></span> <span class="attribute">for</span>="star-4" <span class="attribute">class</span>="icon-star"&gt;&lt;/<span class="tag">label</span>&gt;
&lt;<span class="tag">input</span> <span class="attribute">type</span>="radio" <span class="attribute">name</span>="4 stars" <span class="attribute">id</span>="star-3"&gt;
&lt;<span class="tag"><span class="tag">label</span></span> <span class="attribute">for</span>="star-3" <span class="attribute">class</span>="icon-star"&gt;&lt;/<span class="tag">label</span>&gt;
&lt;<span class="tag">input</span> <span class="attribute">type</span>="radio" <span class="attribute">name</span>="4 stars" <span class="attribute">id</span>="star-2"&gt;
&lt;<span class="tag"><span class="tag">label</span></span> <span class="attribute">for</span>="star-2" <span class="attribute">class</span>="icon-star"&gt;&lt;/<span class="tag">label</span>&gt;
&lt;<span class="tag">input</span> <span class="attribute">type</span>="radio" <span class="attribute">name</span>="4 stars" <span class="attribute">id</span>="star-1"&gt;
&lt;<span class="tag"><span class="tag">label</span></span> <span class="attribute">for</span>="star-1" <span class="attribute">name</span>="4 stars" <span class="attribute">class</span>="icon-star"&gt;&lt;/<span class="tag">label</span>&gt;
&lt;/<span class="tag">div</span>&gt;</code></pre>
<p>
First I hide the radio boxes using a negative margin. On the labels I add the class "icon-star", which triggers the icon font. Then I create a SASS map for the number of stars I want to show.
</p>
<pre class="language-scss" rel="SCSS"><code><span class="variable">$stars-list</span>: (
1,
2,
3,
4
);

<span class="selector">.rating</span> {
<span class="property">position</span>: relative;
<span class="property">overflow</span>: hidden;
<span class="property">height</span>: 32px;
<span class="selector">@include rating-stars</span>(<span class="variable">$stars-list</span>, 32px, orange, #f5d76d, 85);

<span class="comment">// Hide the radio buttons</span>
<span class="selector">[type="radio"]</span> { <span class="property">margin-left</span>: -19px; }

<span class="selector">label</span> { <span class="property">cursor</span>: pointer; }
<span class="selector">.icon-star</span> { <span class="property">font-size</span>: 3rem; }
}
</code></pre>

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
<pre class="language-scss" rel="SCSS"><code><span class="comment">// Set hover + selected label for star rating</span>
<span class="selector">@mixin rating-stars</span>(<span class="variable">$stars</span>, <span class="variable">$star-width</span>, <span class="variable">$c-hover</span>, <span class="variable">$c-selected</span>) {
> <span class="selector">label</span> {
<span class="property">position</span>: absolute;
<span class="property">top</span>: 4px;

<span class="selector">&</span>:hover { <span class="property">color</span>: <span class="variable">$hover</span>; }
}

<span class="comment">// Loop through the stars to position them in the right order,
and set the hover + checked color</span>
<span class="selector">@for</span> <span class="variable">$i</span> from 1 through length(<span class="variable">$stars</span>) {

<span class="comment">// position the stars in reversed order</span>
> <span class="selector">label:nth-of-type(n + #{</span><span class="variable">$i</span><span class="selector">})</span> {
<span class="property">left</span>: (<span class="variable">$star-width</span> * length(<span class="variable">$stars</span>)) - (<span class="variable">$star-width</span> * <span class="variable">$i</span>);
}

<span class="comment">// Handle the hover</span>
> <span class="selector">label:nth-of-type(n + #{</span><span class="variable">$i</span><span class="selector">})</span><span class="selector">:hover</span> ~ <span class="selector">label</span> { <span class="property">color</span>: <span class="variable">$hover</span>; }

<span class="comment">// Set selected color on all label siblings based on the checked radio</span>
> <span class="selector">input[type="radio"]:nth-of-type(n + #{</span><span class="variable">$i</span><span class="selector">}):checked</span> ~ <span class="selector">label</span> {
<span class="property">color</span>: <span class="variable">$selected</span>;
}
}
}


</code></pre>
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