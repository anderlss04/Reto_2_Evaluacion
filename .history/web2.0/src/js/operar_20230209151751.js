let datos = {};
let interval;

function extraerEmpresas() {
  const empresas = document.querySelectorAll('#dRecive .envia');

  if (empresas.length !== 0) {
    let array = [];

    for (let i = 0; i < empresas.length; i++) {
      array.push(empresas[i].id);
    }

    localStorage.setItem('empresas', array);

    router('operar')


    crearEmpresas();

  } else {
    alert('Debe seleccionar alguna empresa para poder operar')
  }
}

function crearEmpresas() {
  const empresas = localStorage.getItem('empresas').split(',');
  const contenedor = document.getElementById('listaEmpresas');

  const fecha = new Date();
  const fechaFormateada = fecha.toISOString().slice(0, 10).replace(/-/g, "-");

  empresas.map(function (empresa) {
    let div = document.createElement('div');
    card = `<div class="flex justify-center">
        <div class="rounded-lg shadow-lg bg-white max-w-sm">
          <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
            <img class="rounded-t-lg" src="../../imagenes/${empresa}.png" alt="${empresa}"/>
          </a>
          <div class="p-6">
            <h5 class="text-sky-900 text-xl font-medium mb-2">${empresa.toUpperCase()}</h5>
            <p class="text-gray-700 text-base mb-4">
              Precio: <span class="text-rose-800"  id="precio${empresa}">${datos}>0</span>
            </p>
            <a href="#!" onclick="router('grafico','${empresa}');pararSetInterval()">
            <button id="${empresa}"  type="button" class=" inline-block px-6 py-2.5 bg-sky-600 text-white font-medium text-xl leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out">Grafico</button>
            </a>
          </div>
        </div>
      </div>`

    div.innerHTML = card;

    contenedor.appendChild(div);
  })

  pedir(empresas, fechaFormateada, 'hora')

}

async function pedir(empresas, fecha, hora) {

  datos = await apiPeticiones(empresas, fecha, hora);

  datos.Empresas.map((empresa) => {
    document.getElementById(`precio${empresa.empresa}`).innerHTML = `${empresa.cierre?empresa.cierre:0}`;
    document.getElementById(`precio${empresa.empresa}`).style.color = 'gray';
  });

  interval = setInterval(async () => {
    datos = await apiPeticiones(empresas, fecha, hora);

    datos.Empresas.map((empresa) => {
      let preioViejo = Number(document.getElementById(`precio${empresa.empresa}`).text);

      console.log(preioViejo, empresa.cierre)

      if (Number(empresa.cierre) > preioViejo) {
        document.getElementById(`precio${empresa.empresa}`).innerHTML = `${empresa.cierre?empresa.cierre:0}`;
        document.getElementById(`precio${empresa.empresa}`).style.color = 'green';
      } else if (Number(empresa.cierre) < preioViejo) {
        document.getElementById(`precio${empresa.empresa}`).innerHTML = `${empresa.cierre?empresa.cierre:0}`;
        document.getElementById(`precio${empresa.empresa}`).style.color = 'red';
      } else{
        document.getElementById(`precio${empresa.empresa}`).innerHTML = `${empresa.cierre?empresa.cierre:0}`;
        document.getElementById(`precio${empresa.empresa}`).style.color = 'gray';
      }

    });
  }, 5000);

}

function pararSetInterval() {
  clearInterval(interval);
}