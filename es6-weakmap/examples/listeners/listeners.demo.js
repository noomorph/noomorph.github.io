function onLoremClick(e) {
    var span = document.createElement('span');
    span.textContent = " dolor sit ";
    $(span).on('click', onDolorSitClick);
    e.target.appendChild(span);
}

function onDolorSitClick(e) {
    var amen = document.createElement('span');
    amen.textContent = " amen! ";
    e.target.parentNode.appendChild(amen);
}

function onAddClick(e) {
    for (var i = 0; i < 1000; i++) {
        var p = document.createElement('p');
        p.textContent = "Lorem ipsum " + i;
        $(p).on('click', onLoremClick);
        document.body.appendChild(p);
    }
}

function onRemoveClick(e) {
    var i = 0;

    while (el = document.body.children[5]) {
        el.remove();
        if (++i === 333) {
            break;
        }
    }
}

$(add).on('click', onAddClick);
$(remove).on('click', onRemoveClick);
