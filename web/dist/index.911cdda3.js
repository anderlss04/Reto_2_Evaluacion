function setCookie(cname, cvalue, exmin) {
    var d = new Date();
    d.setTime(d.getTime() + exmin * 60000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for(var i = 0; i < ca.length; i++){
        var c = ca[i];
        while(c.charAt(0) == " ")c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}
function borrarCoockie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
function checkCookie() {
    var token = getCookie("token");
    if (token == "") router("login");
}

//# sourceMappingURL=index.911cdda3.js.map
