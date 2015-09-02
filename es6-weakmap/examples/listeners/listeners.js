var $ = (function () {
    var storage = new Map();

    function reCall(listener) {
        listener.call(this[0], this[1]);
    }

    function syntheticEventListener(e) {
        var listeners = storage.get(e.target),
            specificListeners = listeners && listeners[e.type];

        if (specificListeners) {
            specificListeners.forEach(reCall, [this, e]);
        }
    }

    return function (el) {
        var wrapper = {
            on: function (event, fn) {
                document.body.addEventListener(event, syntheticEventListener);

                var listeners = storage.get(el) || {};
                listeners[event] = listeners[event] || new Set();
                listeners[event].add(fn);
                storage.set(el, listeners);
            },
            off: function (event, fn) {
                var listeners = storage.get(el),
                    specificListeners = listeners && listeners[event];

                if (specificListeners) {
                    specificListeners.delete(fn);
                }
            }
        };

        return wrapper;
    };
}());
