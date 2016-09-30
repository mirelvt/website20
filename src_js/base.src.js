(function() {
    'use strict';

    function createScrollComponent(checkbox) {
        checkbox.addEventListener('change', toggleScroll, false);

        function toggleScroll() {
            if (checkbox.checked == true) {
                document.body.classList.add('scroll-disabled');
            } else {
                document.body.classList.remove('scroll-disabled');
            }
        }
    }

    function onDocumentLoaded() {
        createScrollComponent(document.getElementById('toggle-menu'));
        FastClick.attach(document.body);
        hljs.initHighlightingOnLoad();
    }

    document.addEventListener('DOMContentLoaded', onDocumentLoaded, false);
})();

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function() {
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})
(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-35887478-1', 'auto');
ga('send', 'pageview');