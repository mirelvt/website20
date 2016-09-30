+++
css = "css/blog.min.css"
date = "2016-10-02"
page_name = "Blog"
title = "How to use svg icons in Django templates?"
description = "This blog post explains how you can use svg sprite and symbols in your django template."
+++

Normally we use icon fonts in our projects, which are created with
<a href="https://rsp.github.io/fontcustom/">Fontcustom</a>. It is a nice tool to
generate the font icon from our own svg icons. Using the icon font in the last 3
years I always bump into some styling issues. The icon font has anti-alias and
doesn't get as sharp as vector images. The most annoying thing is positioning
the icon next another element or text. You have to take into account the vertical
alignment, line-height, letter-spacing etc, after all, it is a font. To position
it correctly in the latest browsers, you have to do a lot of tweaking.

I was curious if you can use inline svg icons in an maintainable way. After
reading the article on
<a href="https://css-tricks.com/svg-symbol-good-choice-icons/">CSS-tricks</a>
about svg symbols and Sara Soueidans' article about
<a href="https://24ways.org/2014/an-overview-of-svg-sprite-creation-techniques/">
svg sprites</a>, I created a little demo page using this technique and discussed
it with my colleagues to give this technique a chance in one of our projects.
Because of the great advantages of svg, the decision was easily made.

The project we started to use svg symbols is build with Django Framework.
The svgs icons are created separately and placed in a folder
called *svg-icons*. This folder is purely for version control.

In the *templates* directory I created the include template file *include_svg_icon_sprite.html*.
It is a html file because at the time of writing we still need to support IE and IE does
not support xlink to an svg file. I include this file in the base template at
the bottom of te page. Using "include" in the file name we know it is a
template snippet. In this file I have one svg file which contains all the symbols.
The symbol contains the svg code copied from each svg icon from the *svg-icons*
directory.

<pre rel="SVG">
<code class="html">
&lt;<span class="tag">svg</span> <span class="attribute">xmlns</span>="http://www.w3.org/2000/svg"
        <span class="attribute">xmlns:xlink</span>="http://www.w3.org/1999/xlink" <span class="attribute">class</span>="svg-sprite"
        <span class="attribute">viewBox</span>="0 0 512 512" <span class="attribute">width</span>="512px" <span class="attribute">height</span>="512px"&gt;
    &lt;<span class="tag">symbol</span> <span class="attribute">id</span>="filter"</span>&gt;
        &lt;<span class="tag">path</span> <span class="attribute">d</span>="M0 26h512v51.206L307.21 333.213v153.6l-102.404-51.208V333.213L0 77.206V26z" /&gt;
    &lt;/<span class="tag">symbol</span>&gt;
    &lt;<span class="tag">symbol</span> <span class="attribute">id</span>="home"&gt;
        &lt;<span class="tag">path</span> <span class="attribute">d</span>="M512 296l-96-96V56h-64v80l-96-96L0 296v16h64v160h160v-96h64v96h160V312h64v-16z" /&gt;
    &lt;/<span class="tag">symbol</span>&gt;
&lt;/<span class="tag">svg</span>&gt;
</code></pre>

To use a symbol you could place the following code in the template every time you
need an icon:
<pre rel="html">
<code class="html">
&lt;<span class="tag">svg</span> <span class="attribute">viewBox</span>="0 0 512 512" <span class="attribute">class</span>="icon-home">
    &lt;<span class="tag">use</span> <span class="attribute">xlink:href</span>="#home"&gt;&lt;/<span class="tag">use</span>&gt;
&lt;/<span class="tag">svg</span>&gt;
</code></pre>

It is still a lot of typing, to make it easier I created a template tag called
icon.py. In the djangoproject documentation you can find more information about <a href="https://docs.djangoproject.com/en/1.10/howto/custom-template-tags/#writing-custom-template-tags">custom template tags</a>.

<pre rel="Python">
<code class="python">
<span class="def">from</span> django <span class="def">import</span> <span class="import">template</span>
<span class="def">from</span> django.utils.safestring <span class="def">import</span> <span class="import">mark_safe</span>
<span class="def">from</span> django.utils.html <span class="def">import</span> <span class="import">format_html</span>

<span class="attribute">register</span> = <span class="import">template</span>.Library()


<span class="def">@register.simple_tag(name='svg_icon')</span>
<span class="def">def svg_icon(icon_name, extra_class='')</span>:
    <span class="attribute">svg_tag</span> = <span class="import">format_html</span>(<span class="string">'&lt;svg viewBox="0 0 512 512" class="icon-{name} {extra}"&gt;'
               '&lt;use xlink:href="#{name}" class="sym-{name}"&gt;&lt;/use&gt;'
               '&lt;/svg&gt;'</span>, name=<span class="attribute">icon_name</span>, extra=<span class="attribute">extra_class</span>)

    <span class="statement">return</span> <span class="import">mark_safe</span>(<span class="attribute">svg_tag</span>)
</code></pre>

To use the icon in your template you only have to load the template tag and then you
can use the created tag everywhere in you template:

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
