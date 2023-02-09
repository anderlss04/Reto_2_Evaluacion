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

                if ($fecha > $maxFecha) {
                    $dias_diferencia = date_diff($maxFecha, $hoy);
                    $fecha = $maxFecha;
                } else {
                    $dias_diferencia = date_diff($fecha, $hoy);
                }



                $dias_diferencia = $dias_diferencia->format('%a');
            } else {
                $dias_diferencia = null;
            }

            if ($dias_diferencia != null && $dias_diferencia <= 7) {

                $todos = [];
                foreach ($empresas as $empresa) {
                    /* Obteniendo el máximo de horas de la tabla EmpresasDiario. */
                    if (!empty($hora)) {
                        $hora = EmpresasDiario::query()
                        ->where('Empresa', $empresa)
                        ->when($fecha != null, function ($query) use ($fecha) {
                            return $query->where('Fecha', '>=', $fecha);
                        })
                        ->max('Hora');

                        $registros = EmpresasDiario::query()
                            ->where('Empresa', $empresa)
                            ->where('Fecha', '>=', $fecha)
                            ->where('Hora', $hora)
                            ->orderBy('Fecha', 'ASC')
                            ->get();

                        $todos = array_merge($todos, $registros->toArray());
                    }else{
                        $registros = EmpresasDiario::query()
                            ->where('Empresa', $empresa)
                            ->where('Fecha', '>=', $fecha)
                            ->get();

                        $todos = array_merge($todos, $registros->toArray());
                    }
                }

                $todos = collect($todos);
            } else {
                $todos = Empresas::query()
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
