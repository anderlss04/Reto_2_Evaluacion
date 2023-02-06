function validacionLogin() {
    $("#loginForm").validate({
        errorPlacement: function(error, element) {
            error.insertBefore(element);
            error.addClass("text-rose-800");
        },
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true
            }
        },
        messages: {
            email: {
                required: "Por favor ingrese un email",
                email: "Por favor ingrese un email v\xe1lido"
            },
            password: {
                required: "Por favor ingrese una contrase\xf1a"
            }
        }
    });
    if ($("#loginForm").valid()) apiLogin();
}
function validacionRegistro() {
    $("#registrationForm").validate({
        errorPlacement: function(error, element) {
            error.insertBefore(element);
            error.addClass("text-rose-800");
        },
        rules: {
            name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 8
            },
            password_confirmation: {
                required: true,
                equalTo: "#pass"
            }
        },
        messages: {
            name: {
                required: "Por favor ingrese un nombre"
            },
            email: {
                required: "Por favor ingrese un email",
                email: "Por favor ingrese un email v\xe1lido"
            },
            password: {
                required: "Por favor ingrese una contrase\xf1a",
                minlength: "La contrase\xf1a debe tener al menos 8 caracteres"
            },
            password_confirmation: {
                required: "Por favor confirme su contrase\xf1a",
                equalTo: "Las contrase\xf1as no coinciden"
            }
        }
    });
    if ($("#registrationForm").valid()) apiRegistro();
}

//# sourceMappingURL=index.5dfb59a1.js.map
