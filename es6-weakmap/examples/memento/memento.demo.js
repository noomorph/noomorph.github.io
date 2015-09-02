function initialize() {
    for (var i = 0; i < 100; i++) {
        var listItem = document.createElement('li');
        listItem.textContent = 'List Item ' + i;
        listItem.style.backgroundColor = rgb(255 - random(10), 255 - random(10), 255 - random(10));
        listItem.onmouseenter = listItem.onmouseleave = toggleHighlight;
        list.appendChild(listItem);
    }

    memorize();
}

function toggleHighlight(e) {
    var adjacentEls = memento.getAdjacentEls(e.target);
    var prev = adjacentEls.prev;
    var next = adjacentEls.next;

    if (prev) {
        prev.classList.toggle('highlight-prev');
    }

    if (next) {
        next.classList.toggle('highlight-next');
    }
}

function memorize() {
    memento.memorize(list);
}

function random(n) {
    return (Math.random() * n) | 0;
}

function rgb(r, g, b) {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

function sort() {
    list.style.display = 'none';
    memento.sort(list);
    list.style.display = null;
}

function reorder() {
    var c = list.children;
    var n = c.length;

    list.style.display = 'none';
    for (var i = 0; i < n; i++) {
        list.insertBefore(c[random(n)], c[random(n)]);
    }
    list.style.display = null;
}
