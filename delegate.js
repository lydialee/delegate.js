/*! delegate.js v0.0.0 - MIT license */

;(function (global) { function moduleDefinition(matches) {

// ---------------------------------------------------------------------------

var elem;

/**
 * Specify the event delegate element
 *
 * @param {Element} node
 * @return {delegate}
 * @api public
 */

function delegate(node) {
    if (!_isElem(node)) {
        throw new Error('delegate(): The argument must be an Element or Document Node');
    }
    elem = node;
    return delegate;
}

/**
 * Delegate the handling of an event type to the given ancestor-element of
 * nodes matching a given CSS selector. The callback function is invoked when
 * an event bubbles up through any nodes that delegated their event handling to
 * the ancestor.
 *
 * @param {String} type DOM Event type
 * @param {String} selector
 * @param {Function} callback
 * @param {Boolean} [capture]
 * @return {Function}
 * @api public
 */

delegate.on = function (type, selector, callback, capture) {
    function wrapper(e) {
        // if this event has a delegateTarget, then we add it to the event
        // object (so that handlers may have a reference to the delegator
        // element) and fire the callback
        if (e.delegateTarget = _getDelegateTarget(elem, e.target, selector)) {
            callback.call(elem, e);
        }
    }

    callback._delegateWrapper = wrapper;
    elem.addEventListener(type, wrapper, capture || false);
    return callback;
};

/**
 * Walk up the DOM tree from the `target` element to which the event was
 * dispatched, up to the delegate `elem`. If at any step, a node matches the
 * given CSS `selector` then we know the event bubbled up through the
 * delegator.
 *
 * @param {Element} elem
 * @param {Element} target
 * @param {String} selector
 * @return {Element|null}
 * @api private
 */

function _getDelegateTarget(elem, target, selector) {
    while (target && target !== elem) {
        if (matches(target, selector)) {
            return target;
        }
        target = target.parentElement;
    }

    return null;
}

/**
 * Determine is a Node is an Element or Document
 *
 * @param {Node} node
 * @return {Boolean}
 * @api private
 */

function _isElem(node) {
    if (node && node.nodeName && (node.nodeType == Node.ELEMENT_NODE || node.nodeType == Node.DOCUMENT_NODE)) {
        return true;
    }
    return false;
}

/**
 * Expose delegate
 */

return delegate;

// ---------------------------------------------------------------------------

} if (typeof exports === 'object') {
    // node export
    module.exports = moduleDefinition(require('matches'));
} else if (typeof define === 'function' && define.amd) {
    // amd anonymous module registration
    define(['matches'], moduleDefinition);
} else {
    // browser global
    global.delegate = moduleDefinition(global.matches);
}}(this));