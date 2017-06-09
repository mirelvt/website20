+++
css = "css/blog.min.css"
date = "2017-06-09"
page_name = "Blog"
title = "Minify javascript with GNU Make"
description = ""
+++

In my former blog post I wrote an <a href="/blog/make-taskrunner">introduction how to
set up Makefile</a> to generate CSS and minify CSS from Sass files.
In this blog post I will extend the Makefile with a rule for generating minified javascript files.

My folder structure and Makefile looks like this:

<pre rel="Folder structure">
<code class="dts">FOO-project/
   static/
      css/
         /* here comes the generated css files */
      js/
         base.src.js
         /* the minified js files will also be placed in this directory */
   scss/
      base.scss
      login.scss
      shop.scss
      _variables.scss
      _mixins.scss
</code>
</pre>

<pre rel="makefile">
<code class="makefile">CSS_OBJ = static/css
SASS_SRCS = scss

CSS_DEPS = $(wildcard $(SASS_SRCS)/_*.scss)
CSS_SRCS = $(filter-out _%, $(notdir $(wildcard $(SASS_SRCS)/*.scss)))
CSS_OBJS = $(patsubst %.scss, $(CSS_OBJ)/%.src.css, $(CSS_SRCS))
CSS_MIN_OBJS = $(patsubst %.scss, $(CSS_OBJ)/%.min.css, $(CSS_SRCS))

all: $(CSS_OBJS) $(CSS_MIN_OBJS)

$(CSS_OBJ)/%.src.css: $(SASS_SRCS)/%.scss $(CSS_DEPS)
    scss $< $@

$(CSS_OBJ)/%.min.css: $(SASS_SRCS)/%.scss $(CSS_DEPS)
    scss --sourcemap=none --style compressed $< $@

clean:
    rm -f $(CSS_OBJS) $(CSS_MIN_OBJS)

.PHONY: clean all

.SUFFIXES:            # Delete the default suffixes
.SUFFIXES: .min.css .src.css
</code>
</pre>

UglifyJS
--------
You need a package which minifies the javascript files.
I use <a href="https://github.com/mishoo/UglifyJS">UglifyJS</a> for this task,
it is a javascript parser, compressor and beautifier. You can install it via npm:

<pre rel="Terminal"> <code class="hljs ruby">$ npm install -g uglify-js</code> </pre>

I create a variable called JS_MIN_OBJS, which replaces the .src.js file name with .min.js file name from the source files 'static/js/*.src.js'. I put this line below the variable CSS_MIN_OBJS in the Makefile:

<pre rel="makefile">
<code class="makefile">CSS_MIN_OBJS = $(patsubst %.scss, $(CSS_OBJ)/%.min.css, $(CSS_SRCS))

JS_MIN_OBJS= $(patsubst %.src.js, %.min.js, $(wildcard $(JS_SRCS)/*.src.js))
</code>
</pre>

Now I add the UglifyJS rule in the Makefile with the UglifyJS options for generating the wanted minified output. I put this line of code below the rule for minifying css:

<pre rel="makefile">
<code class="makefile">$(CSS_OBJ)/%.min.css: $(SASS_SRCS)/%.scss $(CSS_DEPS)
    scss --sourcemap=none --style compressed $< $@

%.min.js: %.src.js
    uglifyjs --comments -c hoist_vars=true,join_vars=true -m -r '$$' -o $@ $<
</code>
</pre>

The UglifyJS options are documented on their <a href="https://github.com/mishoo/UglifyJS#usage">github page</a>, another resource is a blog post from <a href="https://davidwalsh.name/compress-uglify">David Walsh</a>. You can also find the list of options in your terminal with the command: *uglifyjs -h*.

In my example I ask uglify to preserve the copyright comments in the output *(- -comments)* and compress *(-c)* the file with the following options:

- *hoist_vars=true*: Move all variable declarations to the top of the file.
- *join_vars=true*: Join the var declarations.
- *-m*: Mangle names, this reduces the names to single-letter.
- *-r '$$'*: Exclude $ from the mangler.
- *-o $@ $<*: Output to min.js ($@) from .src.js ($<).

To let Make also run the uglify task, I need to add $(JS_MIN_OBJS) to the all target.
I also want that the minified files are deleted when running make:

<pre rel="makefile">
<code class="makefile">CSS_OBJ = static/css
SASS_SRCS = scss
JS_SRCS = static/js

CSS_DEPS = $(wildcard $(SASS_SRCS)/_*.scss)
CSS_SRCS = $(filter-out _%, $(notdir $(wildcard $(SASS_SRCS)/*.scss)))
CSS_OBJS = $(patsubst %.scss, $(CSS_OBJ)/%.src.css, $(CSS_SRCS))
CSS_MIN_OBJS = $(patsubst %.scss, $(CSS_OBJ)/%.min.css, $(CSS_SRCS))
CSS_MAPS =  $(patsubst %.src.css, %.src.css.map, $(CSS_OBJS))

JS_MIN_OBJS= $(patsubst %.src.js, %.min.js, $(wildcard $(JS_SRCS)/*.src.js))

all: $(CSS_OBJS) $(CSS_MIN_OBJS) $(JS_MIN_OBJS)

$(CSS_OBJ)/%.src.css: $(SASS_SRCS)/%.scss $(CSS_DEPS)
    scss $< $@

$(CSS_OBJ)/%.min.css: $(SASS_SRCS)/%.scss $(CSS_DEPS)
    scss --sourcemap=none --style compressed $< $@

%.min.js: %.src.js
    uglifyjs --comments -c hoist_vars=true,join_vars=true -m -r '$$' -o $@ $<

clean:
    rm -f $(CSS_OBJS) $(CSS_MIN_OBJS) $(CSS_MAPS) $(JS_MIN_OBJS)

.PHONY: clean all

.SUFFIXES:            # Delete the default suffixes
.SUFFIXES: .min.css .src.css
</code>
</pre>

Run make in the terminal and the minified files are generated.
In the terminal you'll get the following output:

<pre rel="Terminal"> <code class="hljs ruby">$ make
uglifyjs --comments -c hoist_vars=true,join_vars=true -m -r '$' -o static/js/base.min.js static/js/base.src.js
</code> </pre>

That's it. You only need 4 lines of code to minify your javascript files. Together
with compiling CSS and minifying CSS it is only 30 lines of code. That's pretty clean.