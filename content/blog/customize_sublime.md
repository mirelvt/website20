+++
css = "css/blog.min.css"
date = "2014-02-12"
page_name = "Blog"
title = "Customize Sublime text editor"
description = "At the Fronteers conference 2012 in Amsterdam, Addy Osmani used Sublime Text Editor in his presentation. The editor looked really interesting. Right after the conference I installed Sublime and looked around for packages which would make my life as front end developer easier and make editing more fun. This article is a small tutorial with tips to configure Sublime to your needs, a list of interesting packages, how to customize a theme and links to useful documentation."
+++
Last year at the Fronteers conference in Amsterdam, Addy Osmani used Sublime Text Editor in his presentation.
The editor looked really cool. Right after the conference I installed Sublime and looked around for
packages which would make my life as front end developer easier and make editing more fun. After a
month of playing with Sublime, I decided to leave TextMate (used it since 2005) and use Sublime as
my new main editor.
<p>
In this article I'll give you tips to configure Sublime to your needs, interesting packages,
how to customize a theme and links to useful documentation. Let's get started.
</p>
<h2>Install Sublime Text Editor and packages</h2>
<p>The official page of Sublime Text Editor is:
  <a href="http://www.sublimetext.com">http://www.sublimetext.com</a>,
  you can find the downloads for OS X, Windows and Linux on:
  <a href="http://www.sublimetext.com/2">http://www.sublimetext.com/2</a>.
  To make the most out of Sublime, the first package you want to install
  is the <a href="http://wbond.net/sublime_packages/package_control">
  Package Control Manager</a>. With this tool you can easily install
  useful packages. Follow the installation described on:
  <a href="http://wbond.net/sublime_packages/package_control/installation">
    http://wbond.net/sublime_packages/package_control/installation</a>.
    The installation is really easy.
</p>
<p>When the Package Control is installed, you can start installing
  packages you would like to use. Open Sublime and type in the following
  command:</p>
<ul>
  <li>
    <strong>cmd</strong>+<strong>Shift</strong>+<strong>P</strong>
    to open the Packages directory.</li>
  <li>Type "<strong>install</strong>" and click on the search result:
    <strong>"Package Control: Install Package"</strong>.
    In this window you can search for the packages you like to install.
  </li>
</ul>
<figure>
  <img src="/img/packagemanager.png" alt="Sublime Package manager interface" />
  <figcaption>Installing packages</figcaption>
</figure>

 <p>
  I made a list of packages what makes programming more fun and my life as
  front end developer easier:</p>

<ul>
  <li>
    <strong>Sass</strong>: syntax highlighting and tab/code completion
    for Sass.
  </li>
  <li>
    <a href="https://github.com/titoBouzout/SideBarEnhancements">
      <strong>Sidebar enhancement</strong></a>: With this plugin you can
      do the basics via the sidebar, like new file/folder, edit,
      open/run, reveal, find in selected/parent/project, etc.</li>
  <li>
    <strong><a href="http://emmet.io">Emmet</a></strong>: looks like a
    really awesome toolkit to improve your HTML &amp; CSS workflow.
    Check out the <a href="http://docs.emmet.io/">documentation</a>
    to see what it can do for you. I just read their documentation and
    installed it. I don't have  experience with it yet, but it looks
    really promising.
  </li>
  <li>
    <strong>Less-Build</strong>: if you work with
    <a href="http://lesscss.org/">LESS</a> I recommend to use this tool.
    It provides two build systems for '.less' files, both minified and
    non-minified. Requires lessc (via node.js) on OSX and Linux.
  </li>
  <li>
    <strong>
      <a href="git://github.com/danro/LESS-sublime.git">LESS</a>
    </strong>: syntax highlighting for LESS.</li>
  <li>
    <strong>
      <a href="https://github.com/squ1b3r/Djaneiro">Djaneiro</a>
    </strong>: syntax highlighting and code completion for Django.
  </li>
  <li><strong>HTML5</strong></li>
  <li><strong>HTML Snippets</strong></li>
  <li><strong>HTML Attributes</strong></li>
  <li>
    <strong>
      <a href="https://github.com/SublimeText/SublimeHg">SublimeHG</a>
    </strong>: is a nice tool for
    <a href="http://mercurial.selenic.com/">Mercurial</a>. I use it to
    see which files are changed, to write commit messages and pushing
    it to the repository.</li>
</ul>

<p>If you don't work with LESS or Sass than you could use the following
  tools to create css prefixes and to minify your css/js:</p>

<ul>
<li><a href="http://wbond.net/sublime_packages/prefixr">Prefixr</a></li>
<li><a href="https://github.com/bistory/Sublime-Minifier">Minifier</a></li>
</ul>

<h2>Sublime customization</h2>

You can customize Sublime to your needs, like translating tab size to
spaces, font size, line highlight etc. These customizations are stored
in the user settings:

<ul>
  <li>
    <strong>"Preferences &gt; Settings-user"</strong> (on Linux), or
  </li>
  <li>
    <strong>"Sublime Text 2 &gt; Preferences &gt; Settings-user"</strong>
    (on OS X).
  </li>
</ul>

<p>
  Here's a list of useful settings. You can check the default_settings for
  the complete list you wish to override.
</p>

<pre rel="json">
<code class="json">
{
  "font_size": <span class="number">11,
  "bold_folder_labels":true,
  "caret_style": "phase", // it will fade in and out rather than blink.
  "highlight_line": true,
  "ignored_packages":
  [
  "Vintage"
  ]<span class="string">,
  "match_tags": true,
  // scroll_past_end is already set in default settings,
  // but on OS X, this value is overridden in the platform specific settings.
  // That's why you need to place this line in your user settings.
  "scroll_past_end": true,
  "translate_tabs_to_spaces":true,
  "trim_trailing_white_space_on_save": true
}
</code>
</pre>

<h2>Sublime Key commands</h2>

<p>Sublime has a lot of cool and very handy key commands. The ones I use most are (on OS X):</p>
<ul>
  <li>
    <strong>Opening The Packages directory</strong>: use the command <strong>cmd</strong>+<strong>Shift</strong>+<strong>P</strong>. All resources for supported programming and markup languages are stored here.
  </li>
  <li>
    <strong>Opening a file:</strong> <strong>cmd</strong>+<strong>P</strong>. Start typing the name of the file and you get a list of matched file names.
  </li>
  <li>
    <strong>Opening a file and search for a string</strong>: Use the command <strong>cmd</strong>+<strong>P</strong> and type [filename]@[string], for example: main@wrapper. It will open the file with the name <em>"main"</em> with a string <em>"wrapper"</em> in it. In my case the <em>".wrapper"</em> class is in the <em>"main.scss"</em>.
  </li>
  <li>
    Multiple selection: you will never use <em>"find and replace"</em> again. To add all occurrences of the current word to the selection, use <strong>Ctrl</strong>+<strong>cmd</strong>+<strong>G</strong> on OS X, or <strong>Alt</strong>+<strong>F3</strong> on Windows and Linux.
  </li>
  <li>
    <strong>Split windows</strong>: you can split your window in multiple edit screens. To do so use the key commands <strong>cmd</strong>+<strong>alt</strong>+<strong>2</strong>, this split the window in 2 panels. It depends on the width of your screen how many split windows are useful to you.
  </li>
  <li>
    <strong>Emmet key commands</strong>: I tried some key commands shown on the demo site, but some of them didn't work, like creating a data uri. Most of these key commands are only for the demo. I found a list of working commands on: <a href="https://github.com/sergeche/emmet-sublime#available-actions">github</a>
  </li>
  <li>
    Complete list of <strong>Sublime commands</strong>: check out the page on  <a href="http://docs.sublimetext.info/en/latest/reference/keyboard_shortcuts_win.html">http://docs.sublimetext.info/en/latest/reference/keyboard_shortcuts_win.html</a>
  </li>
</ul>
<figure>
  <img src="/img/findfilestring.png" alt="Find file with class name in Sublime." />
  <figcaption>Find file with class name in Sublime.</figcaption>
</figure>
<h2>Open files via the terminal</h2>
<p>
  I mostly use the terminal to navigate to folders and to open it in sublime. To use an easy command for it I created a symbolic link. In OS X the Application is in "/Applications/Sublime Text 2.app/Contents/SharedSupport/bin/subl". If it is in another directory use that path in step 2. Open your terminal and type in the following commands:
</p>
<pre rel="Terminal">
<code class="dos">
$ cd /usr/local/bin
$ ln -s /Applications/Sublime Text 2.app/Contents/SharedSupport/bin/subl sublime
</code>
</pre>
<p>That's it. You can now use the command <em>"sublime"</em> in your terminal.</p>
<h2>Find your theme</h2>
<p>
  Sublime comes with a couple of standard themes. If none of the default themes matches your personal color styles, you can find a lot of other themes on the internet. I use the Github version from <a href="https://github.com/daylerees/colour-schemes">Dayle Rees Color Schemes</a> and made some changes in it. How did I do that?
</p>
<ul>
  <li>I installed <em>"Dayle Rees color schemes"</em> via Package manager.</li>
  <li>Then I opened the folder <em>Browse Packages</em> (via Preferences).</li>
  <li>Find the theme package and copy the theme file to your user directory in Browser Packages. In my case it was <em>"Github.tmTheme"</em>. This is an XML file.</li>
  <li>Rename the copied file.</li>
  <li>Select your theme via <strong>Preferences</strong> &gt; <strong>Color Scheme</strong> &gt; <strong>User</strong>.</li>
  <li>Open the file in Sublime and play with the colors you want to change. I opened a CSS and HTML File side by side to see the effect of my changes.</li>
  <li>When you're done, you can just close the theme file.</li>
</ul>
<p>I hope this article is meaningful for the people who want to start using Sublime. You can evaluate Sublime for free, and when you are enthusiastic about it, a personal license is only $70.</p>