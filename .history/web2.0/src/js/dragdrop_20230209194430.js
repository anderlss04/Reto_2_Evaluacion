let isMobile = false;
let userAgent = navigator.userAgent;

function movil() {
    if (userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i)) {
        isMobile = true;
    }
}

if (isMobile) {

    const elements = document.querySelectorAll('.envia');
    elements.forEach((element, index) => {
        element.setAttribute('onclick',mover());
    });

}





$(".envia").draggable({
    helper: "clone",
    appendTo: "body",
    start: function (event, ui) {
        $(ui.helper).addClass("dragging");
    },
    stop: function (event, ui) {
        $(ui.helper).removeClass("dragging");
    }
});
$("#dRecive,#dEnvia").droppable({
    accept: ".envia",
    drop: function (event, ui) {
        const dragged = $(ui.draggable);
        $(this).append(dragged);
    }
});


