var home = {
    path: '/',
    template: '',
};
var login = {
    path: '/login',
    template: '',
};
var registro = {
    path: '/registro',
    template: '',
};
var operar = {
    path: '/operar',
    template: '',
};
var grafico = {
    path: '/grafico',
    template: '',
};

function getHTML(file, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', file, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseText);
        }
    };
    xhr.send();
}

getHTML('home.html', function (response) {
    home.template = response;
});

getHTML('login.html', function (response) {
    login.template = response;
});

getHTML('registro.html', function (response) {
    registro.template = response;
});

getHTML('operar.html', function (response) {
    operar.template = response;
});

getHTML('grafico.html', function (response) {
    grafico.template = response;
});

