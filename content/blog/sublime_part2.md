+++
css = "css/blog.min.css"
date = "2018-02-04"
page_name = "Blog"
title = "Sublime Text editor Part 2"
description = "Since 2013 I'm using SublimeText editor and wrote an how to about it to get you up and running. Now 5 years later I'm still using it. I've tested Atom and VSCode as well, but keep returning to SublimeText. In this post I'll explain what packages I need for my environment and why I still like SublimeText over Atom or VSCode."
+++

Since 2013 I'm using SublimeText editor and wrote an how to about it to get you up and running. Now 5 years later I'm still using it. I've tested <a href="https://atom.io/">Atom</a> and <a href="https://code.visualstudio.com/">VSCode</a> as well, but keep returning to <a href="https://www.sublimetext.com/">SublimeText</a>. In this post I'll explain what packages I need for my
environment and why I still like <a href="https://www.sublimetext.com/">SublimeText</a> over <a href="https://atom.io/">Atom</a> or <a href="https://code.visualstudio.com/">VSCode</a>.

Sublime Text 3 is officially out since September 2017. If you have a license for Sublime2 you can upgrade for a small fee to version 3. For the hard work and effort the developers put in this "Sublime" editor I happily pay this small fee for the upgrade. On their <a href="https://www.sublimetext.com/blog/">blog</a> the SublimeText team dedicated a special page with a list of improvements: <a href="https://www.sublimetext.com/2to3">2.0 to 3.0 changes</a>.

Testing Atom and VSCode
-----------------------

Last year I got interested in other editors and tested Atom and VSCode both for 2 weeks seperately.

My basic development requirements for an editor are:

1. syntax highlighting for:
    - SCSS
    - Javascript
    - Django templates
    - Python files
2. Linting for:
    - SCSS: scsslint
    - Javascript: eslint
3. Build tool:
    - Run Make via the editor
4. Version control:
    - Mercurial integration
5. Packages:
    - Emmet
    - Django snippets

And of course key bindings and "Goto anything" feature as in SublimeText.

Atom
----
First I started with Atom. How much work did it take to get my minimum setup configured in Atom?

### Django & Make
After installation, I opened an django html template and start typing html tags. I find the autocompletion suggestions quite annoying but I need it to be able to use django snippet completion.

Syntax higlighting for Javascript, Python and SCSS comes with the default Atom installation. But for Django templating I installed:

- Django-templates
- set-syntax

And:

- Emmet
- python-tools (goto definition etc.)

To be able to run Make via the editor you need the following packages:

- build
- busy-signal (build dependency)
- build-make

Use cmd+alt+b to run make.

### Mercurial integration
I installed <a href="https://atom.io/packages/atom-hg">atom-hg</a>, but I only see in the tree view which files are changed with the default branch. The readme is very summier. There is no option to see the diff. However, there is a simple package to commit your changes: <a href="https://atom.io/packages/hg-commit">hg-commit</a>. It shows the files which are modified but you can still not see the diff. Also the input field for writing a commit is only 1 row. You can't write a good summary. Conclusion: the setup in Atom for mercurial integration is not satisfied.

### Linting
To install linter packages for Javascript and SCSS you need:

- linter.
- linter-eslint, it will also ask to install its dependencies.
- linter-scsslint.

Restart Atom and the linters work. I assume you already have installed the packages for <a href="https://eslint.org/docs/user-guide/getting-started">eslint</a> and <a href="https://github.com/brigade/scss-lint">scss-lint</a> and configured the linting options.


VSCode
------
Emmet and "Go to Definition" is by default available in VSCode.

### Django & Make
To be up and running with Django syntax highlighting and code snippets you need to install:

- Djaneiro

You can run Make via the integrated terminal in VSCode. I also tried the extension makeRunner, but that extension does not work, it is not updated since 2015. Another option
is to create a task in VSCode. With cmd+shift+B you run the VSCode tasks. Example tasks.json:
<pre rel="json">
<code class="json">
{
    <span class="hljs-comment">// See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format</span>
    "version": "2.0.0",
    "tasks": [
        {
            "label": "make",
            "type": "shell",
            "command": "make",
            "group": "build",
            "problemMatcher": []
        }
    ]
}
</code>
</pre>

Downside in VSCode is that the configuration file can not be defined globally. This feature
is on the <a href="https://github.com/Microsoft/vscode/issues/1435">radar</a> at the dev team of Microsoft.

You'll find the task.json in your project directory in the .vscode folder. To use Make
via Task runner you need to copy this file into every project.

### Mercurial integration

You can install the extension:

- HG

And you are good to go! All basic options are available with this extension: push, pull,  merge, commit, view diff etc.

### Linting

To install linter packages for Javascript and SCSS you need:

- linter-eslint.
- linter-scsslint.


SublimeText
-------
After installing SublimeText, the first package you need to have is the Package manager.
You can install it via cmd+shift+P and search for Package manager. Syntax highlighting for Python and "Go to definition" is by default available in Sublime.

### Django & Make

To be up and running with Django syntax highlighting and code snippets, SCSS highlighting and Emmet, you need to install:

- Djaneiro
- Sass (Syntax-highlighting-for-sass)
- Emmet for Sublime Text

For Make you don't need to install anything. Just hit cmd+shift+B to see the build
options and choose Make. The chosen option is saved. If you need to build again you only
use the keys: cmd+B.

### Mercurial integration
Unfortunately there are no fullstack packages for Mercurial integration. You have a nice one for Sublime2 from <a href="https://github.com/guillermooo/Mercurial">guillermooo</a> but it is not upgraded to Sublime3.

To compare changes you can install:

- EasyDiff package (Free).
- Sublimerge ($35 and has merge options).

I have configured Sublime as my default editor for commit messages in my .bash_profile:
<pre>
<code>
export HGEDITOR="subl -w"
export VISUAL="subl -w"
</code>
</pre>

If you like Atom, just change "subl" into "atom" in your .bash_profile.
Conclusion: the setup in Sublime for mercurial integration is not completely satisfied.

### Linting

To install linter packages for Javascript and SCSS you need:

- Sublimelinter.
- Sublimelinter-contrib-scss-lint.
- Sublimelinter-eslint.


How fast are Atom, VSCode and Sublime?
--------------------------------------
I did a simple test by opening a project folder, "goto" file and scroll in a large file.
I used a stopwatch to test the speed. I opened a project folder via the terminal and waited until the project is loaded in the editor. These are my findings:

Opening project folder:

- Atom 5 seconds.
- VSCode 3 seconds.
- Sublime <2 seconds.

Opening a file using the "go to" dropdown is also faster in Sublime, compared with Atom and VSCode:

- VSCode 0.6 seconds.
- Atom 0.6 seconds.
- Sublime: it opens directly the selected file.

Opening and scrolling a large file didn't get any issues so far in all 3 editors.

Conclusion
==========

1. Both VSCode and Atom are free, Sublime costs $80.
2. To be up and running, VSCode is the fastest, second place Sublime, third Atom.
3. Sublime is the fasted editor, second VSCode, third Atom.
4. All 3 editors have lots of packages and themes to install.

In the end you choose and use the editor you like to work with. For me it is still Sublime.
It fits my developer needs, despite its lack of Mercurial support, however VSCode is heading to be my favorite editor. I really like its Mercurial integration, the keybindings are easy to learn and is fast enough. One important issue for me to stick with Sublime and not switching to VSCode is the lack of global settings for e.g Make. Atom costs more effort to setup and is too slow for my taste.
