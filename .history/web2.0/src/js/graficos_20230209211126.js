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
    const data = {
        labels: labels,
        datasets: [
            {
                label: empresas[0],
                backgroundColor: "rgba(255, 0, 0, 0.5)",
                borderColor: "hsl(180, 100%, 50%)",
                color: 'white',
                pointRadius: 0,
                pointBackgroundColor: "transparent",
                pointBorderColor: "transparent",
                data: precios,
                fill: true,
                borderWidth: 0,
                lineTension: 0,
            },
        ],
    };

    const configLineChart = {
        type: "line",
        data,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            legend: {
                labels: {
                    fontColor: 'black',
                    fontSize: 14,
                    padding: 20
                }
            },
            events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
            interaction: {
                mode: 'index',
                intersect: false
            },
            title: {
                display: true,
                text: `Precios de hoy de ${empresas[0]}`,
                fontColor: 'black',
                fontSize: 20,
                padding: 20
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: 'black'
                    },
                    gridLines: {
                        color: 'rgba(255, 255, 255, 0.5)'
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: 'black'
                    },
                    gridLines: {
                        color: 'rgba(255, 255, 255, 0.5)'
                    }
                }]
            },
            tooltips: {
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                titleFontColor: 'black',
                titleFontSize: 14,
                bodyFontColor: 'black',
                bodyFontSize: 14,
                xPadding: 10,
                yPadding: 10,
                cornerRadius: 0,
                mode: 'index',
                intersect: true,
            },
            onclick:{
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: 'rgb(255, 99, 132)'
                    },
                    
                }
            },
        }
    };





    if (chartLine) {
        chartLine.destroy();
    }
    chartLine = new Chart(
        document.getElementById("chart").getContext("2d"),
        configLineChart
    );

}
