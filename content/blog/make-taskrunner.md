+++
css = "css/blog.min.css"
date = "2017-03-15"
page_name = "Blog"
title = "GNU Make for running tasks"
description = "Every front end developer have heard of the task runners Grunt, Gulp, Broccoli, or is even using it. There are a lot of articles and how to's on the web about these tools. However, there is one that doesn't get a lot of attention and that is GNU Make. It was originally created by Stuart Feldman in April 1976. GNU Make is not really popular among front end developers, it has a steep learning curve in comparison with Grunt or Gulp and there are not much examples on how to use it for front end development. In this blog post I would like to change that, I will show you how you can use GNU Make as a task runner for front end development."
+++

Every front end developer have heard of or is using the task runners Grunt, Gulp, Broccoli.
There are a lot of articles and how to's on the web about these tools. However, there is one that
doesn't get a lot of attention and that is <a href="https://www.gnu.org/software/make/">GNU Make</a>.
It was originally created by Stuart Feldman in April 1976. GNU Make is not really popular among front end developers, it has a steep learning curve in comparison with
Grunt or Gulp and there are not much examples on how to use it for front end development. In this blog post
I would like to change that, I will show you how you can use GNU Make as a task runner for front end development.

 First of all, what is Make? There is a good description on
 <a href="https://en.wikipedia.org/wiki/Make_(software)">wikipedia</a>:
 Make is a build automation tool that automatically builds executable programs and libraries from
 source code by reading files called Makefiles which specify how to derive the target program.

How to install GNU Make?
------------------------

Let's first install Make. Mac OS comes with GNU Make 3.81, so it is already available.
I have no experience on installing GNU Make on Linux or Windows, here some articles for these OS's:
<ul>
    <li><a href="http://gnuwin32.sourceforge.net/packages/make.htm">Make for windows</a></li>
    <li><a href="https://www.cyberciti.biz/faq/howto-installing-gnu-c-compiler-development-environment-on-ubuntu/">Make for Ubuntu</a></li>
    <li><a href="https://software.opensuse.org/package/make">openSUSE</a></li>
</ul>

If you find better tutorials let me know and I will update the urls in this blog post. You can contact me on Twitter @mirelvt.

To check if it is already installed, open your terminal and run the following code (on Mac):
<pre rel="Terminal"><code>$ which make</code></pre> This will return a path. On my environment it is:
<pre rel="Terminal"><code>$ /user/bin/make</code></pre>


Create Makefile
---------------

Make works with Makefiles, you place these files in the root of your project. In my examples I will
create one Makefile to run tasks for:
<ul>
    <li>Compiling Sass to css</li>
    <li>Minify css</li>
</ul>

Lets say my folder structure looks like this:
<pre rel="Folder structure">
<code class="dts">FOO-project/
   static/
      css/
         /* here comes the generated css files */
   scss/
      base.scss
      login.scss
      shop.scss
      _variables.scss
      _mixins.scss
</code>
</pre>

<ul>
    <li>
        Now open your project in your favorite editor and create in the root of your project the Makefile:
        <strong>Makefile</strong>
    </li>
</ul>

<pre rel="Folder structure">
<code class="dts">FOO-project/
   static/
      css/
         /* here comes the generated css files */
   scss/
      base.scss
      login.scss
      shop.scss
      _variables.scss
      _mixins.scss
   Makefile
</code>
</pre>

Open the Makefile in your editor and lets start with creating variables for the css and scss paths:

<pre rel="makefile">
<code class="makefile">CSS_OBJ = static/css
SASS_SRCS = scss
</code>
</pre>

Now we create variables which contains:

-  The Sass dependencies, these are the Sass partials.
- Variable that will filter out the dependencies for generating .min.css and .src.css. The filter is needed, otherwise Makefile will also create css files for the Sass partials.
- Variable to create .src.css file names.
- Variable to create .min.css file names.

<pre rel="makefile">
<code class="makefile">CSS_OBJ = static/css
SASS_SRCS = scss

CSS_DEPS = $(wildcard $(SASS_SRCS)/_*.scss)
CSS_SRCS = $(filter-out _%, $(notdir $(wildcard $(SASS_SRCS)/*.scss)))
CSS_OBJS = $(patsubst %.scss, $(CSS_OBJ)/%.src.css, $(CSS_SRCS))
CSS_MIN_OBJS = $(patsubst %.scss, $(CSS_OBJ)/%.min.css, $(CSS_SRCS))
</code>
</pre>

- The *CSS_DEPS* variable uses the wildcard expansion, with this function you get a space seperated list of all files which starts with _ and ends with .scss, in my example these are the Sass partials.
- *CSS_SRCS* variable contains the functions: *filter-out* and *not-dir*.
    - *filter-out* returns all Sass files which are not partials, in our example it will return base.scss, shop.scss and login.scss.
    - *not-dir* extracts all but the directory-part of each file name in CSS_DEPS. With *not-dir* function you make sure that the Sass partials are left alone.
- *CSS_OBJS* contains the *patsubst* function: **$(patsubst pattern,replacement,text)**. The *CSS_OBJS* replaces the Sass file names with .src.css from the source files defined in the variable *CSS_SRCS* and put them in the css directory.
- *CSS_MIN_OBJS* replaces the Sass file names with .min.css from the source files defined in the variable *CSS_SRCS* and put them in the css directory.

These 4 variables are used for creating CSS source files (not compressed) and minified CSS files.

Makefile rules
--------------

Now we will create the rules for the Makefile. When you have Sass installed you can use its command in the Makefile to create your CSS.

A rule has the following format:
<pre rel="makefile">
<code class="makefile">targets : prerequisites
   recipe</code></pre>

In our example the first rule is to compile .src.css files with Sass.
The target is **$(CSS_OBJ)/%.src.css**, the prerequisites **$(SASS_SRCS)/%.scss $(CSS_DEPS)** and the recipe **scss $< $@** . $< and $@ are called automatic variables. These variables have values computed afresh for each rule that is executed. The rule to create .src.css will be executed 3 times: for the base, login and shop. The rule to create .min.css files are also executed 3 times.

Be aware to use spaces not tabs for indentation. If you use the latter and run make you get the error: <strong>Makefile:18: *** missing separator.  Stop.</strong>

<pre rel="makefile">
<code class="makefile">CSS_OBJ = static/css
SASS_SRCS = scss

CSS_DEPS = $(wildcard $(SASS_SRCS)/_*.scss)
CSS_SRCS = $(filter-out _%, $(notdir $(wildcard $(SASS_SRCS)/*.scss)))
CSS_OBJS = $(patsubst %.scss, $(CSS_OBJ)/%.src.css, $(CSS_SRCS))
CSS_MIN_OBJS = $(patsubst %.scss, $(CSS_OBJ)/%.min.css, $(CSS_SRCS))

$(CSS_OBJ)/%.src.css: $(SASS_SRCS)/%.scss $(CSS_DEPS)
    scss $< $@

$(CSS_OBJ)/%.min.css: $(SASS_SRCS)/%.scss $(CSS_DEPS)
    scss --sourcemap=none --style compressed $< $@
</code>
</pre>

Now that the rules are in place, you need to let make know what to compile. You use targets for this. In your Makefile the *all* target is set. This is one of Makes <a href="https://www.gnu.org/software/make/manual/make.html#Standard-Targets">standard targets</a>.

<pre rel="makefile">
<code class="makefile">CSS_OBJ = static/css
SASS_SRCS = scss

CSS_DEPS = $(wildcard $(SASS_SRCS)/_*.scss)
CSS_SRCS = $(filter-out _%, $(notdir $(wildcard $(SASS_SRCS)/*.scss)))
CSS_OBJS = $(patsubst %.scss, $(CSS_OBJ)/%.src.css, $(CSS_SRCS))
CSS_MIN_OBJS = $(patsubst %.scss, $(CSS_OBJ)/%.min.css, $(CSS_SRCS))

all: $(CSS_MIN_OBJS) $(CSS_OBJS)

$(CSS_OBJ)/%.src.css: $(SASS_SRCS)/%.scss $(CSS_DEPS)
    scss $< $@

$(CSS_OBJ)/%.min.css: $(SASS_SRCS)/%.scss $(CSS_DEPS)
    scss --sourcemap=none --style compressed $< $@
</code>
</pre>

Now you can run make in your terminal to compile the CSS files, the output will look like this:

<pre rel="Terminal"><code>$ make
scss --sourcemap=none --style compressed scss/base.scss static/css/base.min.css
scss --sourcemap=none --style compressed scss/login.scss static/css/login.min.css
scss --sourcemap=none --style compressed scss/shop.scss static/css/shop.min.css
scss scss/base.scss static/css/base.src.css
scss scss/login.scss static/css/login.src.css
scss scss/shop.scss static/css/shop.src.css
</code></pre>

As you can see the order of the compilation is as defined in the *all* target. First the minified are compiled then the CSS source files. You can change the order.

<pre rel="makefile">
<code class="makefile">all: $(CSS_OBJS) $(CSS_MIN_OBJS) </code></pre>

If you run make again you get the message:
<pre rel="terminal"><code>make: Nothing to be done for `all'.</code></pre>

This is because there are no changes in the Sass files and the CSS files are also generated. Change something in one of your Sass files or delete the files from the CSS folder and run make again. Now you see that the order of make has changed.

Make clean
----------
Wouldn't it be nice to clean up the CSS folder via a Make recipe? You can do this by adding the following target and recipe to your Makefile:

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
</code>
</pre>

If you run **make clean** the CSS files are removed, this should be the output in your terminal:

<pre rel="terminal"><code>$ make clean
rm -f  static/css/base.src.css  static/css/login.src.css static/css/shop.src.css
static/css/base.min.css  static/css/login.min.css  static/css/shop.min.css
</code></pre>

.PHONY
------
The Makefile is finished, right? Not really. If you create a file with, for example, the name *clean* and you run: make clean, clean would always be considered up to date and its recipe would not be executed, because it had no prerequisites. Just try it, create a file named clean and run make clean. You will get the following output in your terminal: **make: `clean' is up to date**. So how to avoid this? <a href="https://www.gnu.org/software/make/manual/make.html#Phony-Targets">Phony target</a> comes to the rescue. With phony target you avoid conflict with a file of the same name and it also improve performance. Add
**.PHONY: clean all** to your Makefile and run make clean again. As you can see the clean file triggers no conflict anymore and executes the target.

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
</code>
</pre>

Suffix rules
------------

Suffix rules are the old-fashioned way of defining implicit rules for make. They are supported in GNU make for compatibility with old makefiles. Suffix rule definitions are recognized by comparing each rule’s target against a defined list of known suffixes. If you wish to eliminate the default known suffixes instead of just adding to them, write a rule for .SUFFIXES with no prerequisites. By special dispensation, this eliminates all existing prerequisites of .SUFFIXES. You can then write another rule to add the suffixes you want. (Source <a href="https://www.gnu.org/software/make/manual/make.html#Suffix-Rules">GNU Manual</a>)

In our example the only suffixes we want are .min.css and .src.css:

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

Now you have a simple task runner to create source CSS and minified CSS files with just **23 lines of code**!

Run make in Sublime or Atom
---------------------------

You can use the terminal to run make, but you can perhaps also use your favorite editor, check their site if there is a package available. If you use Sublime or Atom:

- Sublime is shipped with its own build tool. You can find the list of build tools in the Tools/Build System menu. To select the build system you want, use the following key command (on Mac): **super+shift+B**. Once the choice has been made, the selected build system will be remembered for the project. Now you just simply run <strong>super+B</strong> to compile your css.
- Atom has a package named **build-make** which you can install via their package manager. You also need the **atom-build** package.

You can do a lot more with Make, you can also generate minified js files, generate css with less or generate font icons using fontcustom.
The options are endless. To get you up and running I shall create in the near future some more Makefile examples which you can use.

Documentation
-------------

- <a href="https://www.gnu.org/software/make/">GNU Make</a>
- <a href="https://www.gnu.org/software/make/manual/make.html">GNU Make manual</a>
