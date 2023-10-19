# Reto Intermodular 2DAW3 22-23

Este proyecto es un reto intermodular para la evaluación de los módulos de 2o DAM durante el curso 2022-2023.

## Descripción

El objetivo de este reto es desarrollar una aplicación web que muestre en tiempo real los datos de cotización en bolsa de las empresas del IBEX35 seleccionadas por el usuario.

Inicialmente se muestran las 10 empresas más importantes y el usuario puede seleccionar mediante drag and drop las que quiera visualizar. La configuración se guarda en localStorage.

Los datos se obtienen de una API REST desarrollada en el backend que genera datos aleatorios simulando cotizaciones reales. La API se alimenta de una base de datos MySQL con datos históricos.  

El frontend implementa la lógica de negocio y consume la API REST para obtener los datos en tiempo real y representarlos en un panel actualizable.

## Tecnologías

- Frontend
  - HTML, CSS, JS
  - Bootstrap
  - Chart.js
  - Fetch API
  - LocalStorage
  - jQuery

- Backend 
  - Node.js
  - Express
  - MySQL
  - API REST
  
- Docker
  - Contenedorización
  - Balanceador de carga
  - Proxy inverso  

## Instalación

\`\`\`
git clone https://github.com/anderlss04/Reto_2_Evaluacion
\`\`\`

## Uso 

\`\`\`  
docker-compose up --build
\`\`\`

Esto levantará el entorno completo:

- Aplicación frontend en http://localhost:3000
- API REST en http://localhost:3001
- Servidor de BBDD MySQL

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)
