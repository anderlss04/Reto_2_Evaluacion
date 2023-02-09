// let isMobile = false;
// let userAgent = navigator.userAgent;

// function movil() {
//     if (userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i) || 
//     (userAgent.match(/Opera Mini/i) && userAgent.match(/Mobile/i)) ||
//     window.screen <= 768
//     ) {
//         const elements = document.querySelectorAll('.envia');
//         elements.forEach((element, index) => {
//             element.setAttribute('onclick', mover());
//         });
//         alert('movil')
//     }
//     console.log('no movil');
// }

// function mover() {
//     alert('mover')
    
//         const envia = $(this).closest('.envia');
//         if (envia.parent().attr("id") === "dRecive") {
//             $('html, body').animate({
//                 scrollTop: $("#dEnvia").offset().top
//             }, 1500);
//             envia.appendTo("#dEnvia");
//         } else {
//             $('html, body').animate({
//                 scrollTop: $("#dRecive").offset().top
//             }, 1500);
//             envia.appendTo("#dRecive");
//         }
    
// }



// $(".envia").draggable({
//     helper: "clone",
//     appendTo: "body",
//     start: function (event, ui) {
//         $(ui.helper).addClass("dragging");
//     },
//     stop: function (event, ui) {
//         $(ui.helper).removeClass("dragging");
//     }
// });
// $("#dRecive,#dEnvia").droppable({
//     accept: ".envia",
//     drop: function (event, ui) {
//         const dragged = $(ui.draggable);
//         $(this).append(dragged);
//     }
// });

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

