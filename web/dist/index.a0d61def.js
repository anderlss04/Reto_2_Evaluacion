const PATHS = {
    home: home,
    login: login,
    registro: registro,
    operar: operar,
    grafico: grafico,
    error: {
        path: "/error",
        template: `
                    <h1>404</h1>
                    <p>La página que buscas no existe</p>
                    `
    }
};
function router(aDondeQuiereir, empresa) {
    const path = PATHS[aDondeQuiereir];
    if (path) {
        if (path.path == "/grafico") {
            localStorage.setItem("grafico", empresa);
            document.querySelector("#root").innerHTML = path.template;
            crearGrafico();
        } else document.querySelector("#root").innerHTML = path.template;
    } else document.querySelector("#root").innerHTML = PATHS.error.template;
}

//# sourceMappingURL=index.a0d61def.js.map
