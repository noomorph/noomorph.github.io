var memento = (function () {
    var storage = new WeakMap();
    var sort = Array.prototype.sort;
    var slice = Array.prototype.slice;

    return {
        memorize: function (parentEl) {
            for (var i = 0; i < parentEl.children.length; i++) {
                var childEl = parentEl.children[i];
                storage.set(childEl, {
                    index: i,
                    prev: parentEl.children[i - 1],
                    next: parentEl.children[i + 1]
                });
            }
        },

        getAdjacentEls: function (el) {
            var elData = storage.get(el);

            return {
                prev: elData && elData.prev,
                next: elData && elData.next
            };
        },

        sort: function (parentEl) {
            var clonedEls = slice.call(parentEl.children, 0);
            sort.call(clonedEls, function (a, b) {
                var aIndex = (storage.get(a) || {}).index || 0;
                var bIndex = (storage.get(b) || {}).index || 0;

                return bIndex - aIndex;
            });

            for (var i = 1; i < clonedEls.length; i++) {
                parentEl.insertBefore(clonedEls[i], clonedEls[i - 1]);
            }

            return clonedEls;
        }
    };
}());
