let isMobile = false;
let userAgent = navigator.userAgent;

function movil() {
    if (userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i) || 
    (userAgent.match(/Opera Mini/i) && userAgent.match(/Mobile/i)) 
    ) {
        const elements = document.querySelectorAll('.envia');
        elements.forEach((element, index) => {
            element.setAttribute('onclick', mover());
        });
        alert('movil')
    }
    console.log('no movil');
}

function mover() {
    
        const envia = $(this).closest('.envia');
        if (envia.parent().attr("id") === "dRecive") {
            $('html, body').animate({
                scrollTop: $("#dEnvia").offset().top
            }, 1500);
            envia.appendTo("#dEnvia");
        } else {
            $('html, body').animate({
                scrollTop: $("#dRecive").offset().top
            }, 1500);
            envia.appendTo("#dRecive");
        }
    
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


