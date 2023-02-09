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
    if (chartLine) {

        chartLine.data.labels = labels;
        chartLine.data.datasets[0].data = precios;
        chartLine.data.datasets[0].label = empresas[0];

        chartLine.options.title.text = `Precios de hoy de ${empresas[0]}`;

        chartLine.update();
        chartLine.red
    } else {
        const data = {
            labels: labels,
            datasets: [
                {
                    label: empresas[0],
                    backgroundColor: "rgba(255, 0, 0, 0.5)",
                    borderColor: "hsl(360, 100%, 50%)",
                    color: 'green',
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
                        fontColor: 'black', // color de la leyenda
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
                    fontColor: 'black', // color del título
                    fontSize: 20,
                    padding: 20
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: 'black' // color de las etiquetas de los ejes y
                        },
                        gridLines: {
                            color: 'rgba(255, 255, 255, 0.5)' // color de las líneas de los ejes
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: 'black' // color de las etiquetas de los ejes x
                        },
                        gridLines: {
                            color: 'rgba(255, 255, 255, 0.5)' // color de las líneas de los ejes x
                        }
                    }]
                },
                tooltips: {
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', // color de fondo del tooltip
                    titleFontColor: 'black', // color del título del tooltip
                    titleFontSize: 14,
                    bodyFontColor: 'black', // color del cuerpo del tooltip
                    bodyFontSize: 14,
                    xPadding: 10,
                    yPadding: 10,
                    cornerRadius: 0,
                    mode: 'index',
                    intersect: true,
                },
                onclick: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: 'rgb(255, 99, 132)' // color de la leyenda
                        },

                    }
                },
            }
        };

        chartLine = new Chart(
            document.getElementById("chart").getContext("2d"),
            configLineChart
        );
    }
}
