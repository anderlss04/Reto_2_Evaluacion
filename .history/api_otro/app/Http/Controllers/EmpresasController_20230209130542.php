<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Empresas;
use App\Models\EmpresasDiario;
use DateTime;

class EmpresasController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Obtiene los datos de la tabla EmpresasDiario si la fecha está dentro de los últimos 7 días, en
     * caso contrario obtiene los datos de la tabla Empresas
     * 
     * @param Request request El objeto de la solicitud.
     * 
     * @return El método devuelve una respuesta JSON con el estado de la solicitud y los datos.
     */
    public function index(Request $request)
    {
        $empresas = $request->input('empresa');
        $fecha = $request->input('fecha');
        $hora = $request->input('hora');

        try {
            /* Convertir la fecha en una cadena y luego calcular la diferencia entre la fecha actual y
            la fecha pasada en la solicitud. */
            if (!empty($fecha)) {
                $fecha = new DateTime($fecha);
                $hoy = new DateTime();

                $maxFecha = EmpresasDiario::query()
                    ->whereIn('Empresa', $empresas)
                    ->max('Fecha');
                $maxFecha = new DateTime($maxFecha);

                if($fecha > $maxFecha){
                    $dias_diferencia = date_diff($maxFecha, $hoy);
                    $fecha = $maxFecha;
                }else{
                    $dias_diferencia = date_diff($fecha, $hoy);
                }


                
                $dias_diferencia = $dias_diferencia->format('%a');
            } else {
                $dias_diferencia = null;
            }

            if ($dias_diferencia != null && $dias_diferencia <= 7) {

                /* Obteniendo el máximo de horas de la tabla EmpresasDiario. */
                if (!empty($hora)) {
                    $hora = EmpresasDiario::
                    query()
                        ->whereIn('Empresa', $empresas)
                        ->where('Fecha', '>=', $fecha)
                        ->max('Hora');
                }

                $todos = EmpresasDiario::query()
                    ->whereIn('Empresa', $empresas)
                    ->when($fecha != null && $hora != null, function ($query) use ($fecha, $hora) {
                        return $query->where('Fecha', '>=', $fecha)
                            ->where('Hora', '>=', $hora);
                    })
                    ->when($fecha != null && $hora == null, function ($query) use ($fecha) {
                        return $query->where('Fecha', '>=', $fecha);
                    })
                    ->get();
            } else {
                $todos = Empresas::
                query()
                    ->whereIn('Empresa', $empresas)
                    ->when($fecha != null, function ($query) use ($fecha) {
                        return $query->where('Fecha', '>=', $fecha);
                    })
                    ->get();
            }

            return response()->json([
                'status' => 'success',
                'Empresas' => $todos,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

Este controlador de PHP Laravel se encarga de manejar las solicitudes a la API. La función index se encarga de obtener los datos de una de dos tablas, EmpresasDiario o Empresas, dependiendo de la fecha especificada en la solicitud. Si la fecha es dentro de los últimos 7 días, se obtendrán los datos de la tabla EmpresasDiario, en caso contrario se obtendrán los datos de la tabla Empresas.
El controlador se protege con el middleware "auth:api" que garantiza que solo usuarios autenticados puedan acceder a los datos.
La fecha y la hora especificadas en la solicitud se convierten en un objeto de fecha y se utilizan para calcular la diferencia entre la fecha actual y la fecha especificada en la solicitud. Si la fecha especificada es más reciente que la fecha máxima en la tabla EmpresasDiario, se utiliza la fecha máxima en su lugar.
El método devuelve una respuesta JSON con el estado de la solicitud y los datos. En caso de error, se devuelve una respuesta con un estado de error y un mensaje de error.
