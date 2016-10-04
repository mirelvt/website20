+++
css = "css/blog.min.css"
date = "2016-10-04"
page_name = "Blog"
title = "How to use svg icons in Django templates?"
description = "This blog post explains how you can use svg sprite and symbols in your django template."
+++

I am accustomed to use icon fonts in our projects at Dreamsolution, which are created with
<a href="https://rsp.github.io/fontcustom/">Fontcustom</a>. It is a nice tool to
generate the font icon from our own svg icons. Using the icon font in the last 3
years I always bump into some styling issues. The icon font has anti-alias and
doesn't get as sharp as vector images. The most annoying thing is positioning
the icon next another element or text. You have to take into account the vertical
alignment, line-height, letter-spacing etc, after all, it is a font. To position
it correctly in the latest browsers, you have to do a lot of tweaking.

I was curious if you can use svg icons in an maintainable way. After
reading the article on
<a href="https://css-tricks.com/svg-symbol-good-choice-icons/">CSS-tricks</a>
about svg symbols and Sara Soueidans' article about
<a href="https://24ways.org/2014/an-overview-of-svg-sprite-creation-techniques/">
svg sprites</a>, I created a little demo page using this technique and discussed
it with my colleagues to give this technique a chance in one of our projects.
Because of the great advantages of svg, the decision was easily made.

The project we started to use svg symbols is build with Django Framework.
The svg icons are created separately and placed in a folder
called *svg-icons*. This folder is purely for version control.

In the *templates* directory I created the include template file *include_svg_icon_sprite.html*.
It is a html file because at the time of writing we still need to support IE and IE does
not support xlink to an svg file. I include this file in the base template at
the bottom of the page. Using "include" in the file name we know it is a
template snippet. In this file I have one svg file which contains all the symbols.
The symbol contains the svg code copied from each svg icon from the *svg-icons*
directory.

In the code snippet you'll notice the class *svg-sprite*.
If you do not hide the svg, all the icons will be displayed. In your
Sass or css file you set .svg-sprite { display: none; }.

<pre rel="SVG icon sprite">
<code>
&lt;svg xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" class="svg-sprite"
        viewBox="0 0 512 512" width="512px" height="512px"&gt;
    &lt;symbol id="filter"&gt;
        &lt;path d="M0 26h512v51.206L307.21 333.213v153.6l-102.404-51.208V333.213L0 77.206V26z" /&gt;
    &lt;/symbol&gt;
    &lt;symbol id="home"&gt;
        &lt;path d="M512 296l-96-96V56h-64v80l-96-96L0 296v16h64v160h160v-96h64v96h160V312h64v-16z" /&gt;
    &lt;/symbol&gt;
&lt;/svg&gt;
</code>
</pre>

To use a symbol you could place the following code in the template every time you
need an icon:
<pre rel="html">
<code>
&lt;ul&gt;
    &lt;li&gt;
        &lt;a href="{% url "home" %}" class="menu-item"&gt;
            &lt;svg viewBox="0 0 512 512" class="icon-home">
                &lt;use xlink:href="#home"&gt;&lt;/use&gt;
            &lt;/svg&gt;
            Home
        &lt;/a&gt;
    &lt;/li&gt;
    &lt;li&gt;
        &lt;a href="{% url "filter" %}" class="menu-item"&gt;
            &lt;svg viewBox="0 0 512 512" class="icon-home">
                &lt;use xlink:href="#filter"&gt;&lt;/use&gt;
            &lt;/svg&gt;
            Filter
        &lt;/a&gt;
    &lt;/li&gt;
&lt;/ul&gt;
</code></pre>

Instead of typing this every time I need an icon, I created a template tag called
*icon.py*. In the djangoproject documentation you can find more information about <a href="https://docs.djangoproject.com/en/1.10/howto/custom-template-tags/#writing-custom-template-tags">custom template tags</a>.

<pre rel="icon.py">
<code class="python">
from django import template
from django.utils.safestring import mark_safe
from django.utils.html import format_html

register = template.Library()


@register.simple_tag(name='svg_icon')
def svg_icon(icon_name, extra_class=''):
    svg_tag = format_html(<span class="string">'&lt;svg viewBox="0 0 512 512" class="icon-{name} {extra}"&gt;'
               '&lt;use xlink:href="#{name}" class="sym-{name}"&gt;&lt;/use&gt;'
               '&lt;/svg&gt;', name=icon_name, extra=extra_class)

    return mark_safe(svg_tag)
</code></pre>

This custom tag has 2 variables, the *icon_name* and *extra_class*. If you need
a specific styling for the icon you can set an extra class. To use the custom
template tag in your template you have to load the template tag in your Django
template and you are ready to go:

<pre rel="Django HTML">
<code class="django">
{% load icon %}
&lt;ul&gt;
    &lt;li&gt;
        &lt;a href="{% url "home" %}" class="menu-item"&gt;
            {% svg_icon "home" %} Home
        &lt;/a&gt;
    &lt;/li&gt;
    &lt;li&gt;
        &lt;a href="{% url "filter" %}" class="menu-item"&gt;
            {% svg_icon "filter" %} Filter
        &lt;/a&gt;
    &lt;/li&gt;
&lt;/ul&gt;
</code></pre>

The only thing you now have to do is to give the icon its dimensions and a color.
In this example all the icons get the same styling.

<pre rel="CSS">
<code>
[class^="icon-"] {
    width: 2rem;
    height: auto;
    fill: #222;
}
</code>
</pre>

This is a short tutorial how to use svg icons in Django templates. I hope this
article is useful for you.


