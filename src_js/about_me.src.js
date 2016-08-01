(function() {
  'use strict';

    // Photo Widget Object
    var PhotosWidget = {
        elm_create: function(container) {
            this.elm = document.createElement('img');
            container.insertBefore(this.elm, container.firstChild);
        },
        elm_attrs: function(img_src) {
            this.elm.className = 'photo-side';
            this.elm.src = '/img/' + img_src;
            this.elm.alt = 'At work';
        },
    };

    var Photo = Object.create(PhotosWidget);
    Photo.setup = function(wrapper, img_src) {
        if (window.matchMedia('(max-width: 862px)').matches) {
            var photos = wrapper.getElementsByClassName('photo-side');
            for (var i = 0; i < photos.length; i++) {
                wrapper.removeChild(photos[i]);
            }
        } else if (wrapper.children.length < 3) {
            this.elm_create(wrapper);
            this.elm_attrs(img_src);
        }
    };

  function onDocumentLoaded() {
    var img_left = Object.create(Photo);
    var img_right = Object.create(Photo);
    img_left.setup(document.querySelector('.photos'), 'aboutme-left.jpg');
    img_right.setup(document.querySelector('.photos'), 'aboutme-right.jpg');
  }

  document.addEventListener('DOMContentLoaded', onDocumentLoaded, false);
  window.addEventListener('resize', onDocumentLoaded, false);
})();