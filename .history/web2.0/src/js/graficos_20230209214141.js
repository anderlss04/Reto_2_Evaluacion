let precios = [];
let datosGrafico = {};
let empresas = [];
let labels = [];
var chartLine = null;

function obtenerFecha(intervalo) {
    const fecha = new Date();
    switch (intervalo) {
        case '1d':
            return fecha.toISOString().slice(0, 10);
        case '1w':
            fecha.setDate(fecha.getDate() - 7);
            return fecha.toISOString().slice(0, 10);
        case '1m':
            fecha.setMonth(fecha.getMonth() - 1);
            return fecha.toISOString().slice(0, 10);
        case '1y':
            fecha.setFullYear(fecha.getFullYear() - 1);
            return fecha.toISOString().slice(0, 10);
        default:
            return null;
    }
}

async function crearGrafico() {
    precios = [];
    labels = [];

    let empresa = localStorage.getItem('grafico');

    empresas.push(empresa);

    let select = document.getElementById('intervalo-select')
    let intervalo = select.value;
    let fecha = obtenerFecha(intervalo);

    datosGrafico = await apiPeticiones(empresas, fecha, null);

    datosGrafico.Empresas.forEach((dato) => {
        precios.push(parseFloat(dato.cierre));
        labels.push(intervalo === '1d' ? dato.hora : dato.fecha);
    });

    escribirGrafico();

}

function escribirGrafico() {
    if(chartLine){

    }else{

    }
    

    chart.data.labels = labels;
    chart.data.datasets[0].data = precios;
    chart.data.datasets[0].label = empresas[0];

    chart.update();
}
