let isMobile = false;
let userAgent = navigator.userAgent;

function movil(){
    if (userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i)) {
        isMobile = true;
        alert('true')
    }
    
    if (isMobile) {
        if (window.matchMedia("(max-width: 600px)").matches) {
            const elements = document.querySelectorAll('.envia');
            elements.forEach((element, index) => {
                const button = document.createElement("button");
                button.innerHTML = "Move";
                button.classList.add("move-button");
                button.setAttribute('class', 'text-white bg-sky-600 rounded-lg hover:bg-sky-900 w-full');
                button.setAttribute("id", `move-button-${index}`);
                element.appendChild(button);
            });
        }
    
        $(document).on('click', '[id^=move-button-]', function () {
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
        });
    } 
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