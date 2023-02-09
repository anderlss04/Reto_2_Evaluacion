interact('.envia')
    .draggable({
      inertia: true,
      autoScroll: true,
      onmove: dragMoveListener
    })

  function dragMoveListener (event) {
    var target = event.target,
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  interact('#dRecive').dropzone({
    accept: '.envia',
    overlap: 0.75,
    ondrop: function (event) {
      event.relatedTarget.style.backgroundColor = 'lightblue';
      event.relatedTarget.style.transform = '';
      event.relatedTarget.setAttribute('data-x', 0);
      event.relatedTarget.setAttribute('data-y', 0);
      event.target.appendChild(event.relatedTarget);
    }
  });

    interact('#dEnvia').dropzone({
    accept: '.envia',
    overlap: 0.75,
    ondrop: function (event) {
        event.relatedTarget.style.backgroundColor = 'white';
        event.relatedTarget.style.transform = '';
        event.relatedTarget.setAttribute('data-x', 0);
        event.relatedTarget.setAttribute('data-y', 0);
        event.target.appendChild(event.relatedTarget);
        }
    });

