(function() {
    'use strict';

    function startAnimation() {
        const anim_elms = document.querySelectorAll('animate');
        const anim_trans_elms =document.querySelectorAll('animateTransform');

        for (let i = 0; i < anim_elms.length; i++) {
            let e_parent = anim_elms[i].parentNode;
            e_parent.dispatchEvent(new CustomEvent('startanimation'));
        }

        for (let i = 0; i < anim_trans_elms.length; i++) {
            let e_parent = anim_trans_elms[i].parentNode;
            e_parent.dispatchEvent(new CustomEvent('startanimation'));
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        var btns = document.querySelectorAll('[data-trigger="startanimation"]');

        if (btns) {
            for (let i = 0; i < btns.length; i++)
                btns[i].addEventListener('click', startAnimation);
        }
    });
})();
