let isMobile = false;
let userAgent = navigator.userAgent;

function movil(){

}
else {
    $(function () {
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
    });
}
