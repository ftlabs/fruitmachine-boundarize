/*jshint node:true*/

/**
 * FRUITMACHINE BOUNDARDIZE
 *
 * The purpose of this helper is to give the element the
 * css properties required to isolate it in the DOM tree so that
 * less has to be traversed when the dom is updated.
 *
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All rights reserved]
 */

'use strict';

/**
 * Module Dependencies
 */

var fastdom = require('fruitmachine-fastdom');

/**
 * Exports
 */

module.exports = function(view) {
    if (view.boundarize) return;
    view.attachHelper(fastdom);

    view.boundarize = function (options, callback) {

        // Accepts one argument
        if (typeof options === 'function') {
            callback = options;
            options = undefined;
        } else {
            callback = callback || function(){};
        }

        var silent = options && options.silent;

        view.read(function() {
            var el = view.el;
            if (!el) return;

            var height = el.clientHeight;

            view.write(function() {
                el.style.height = height + 'px';
                el.style.width = '100%';
                el.style.overflow = 'hidden';

                if (!silent) {
                    view.fire('heightchanged');
                }
                callback();
            });
        });
    };

    view.unboundarize = function() {
        view.el.style.height = '';
    };
};
