<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * Valida la solicitud y luego intenta autenticar al usuario con las credenciales proporcionadas.
     * Si la autenticación falla, devuelve un error 401. Si tiene éxito, devuelve un mensaje de éxito
     * con el token
     * 
     * @param Request request El objeto de la solicitud.
     * 
     * @return Una ficha
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('email', 'password');
        $token = Auth::attempt($credentials, true);

        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        return response()->json([
            'status' => 'success',
            'token' => $token,
        ]);
    }

    /**
     * Crea un nuevo usuario, inicia sesión y devuelve un token
     * 
     * @param Request request El objeto de la solicitud.
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = Auth::login($user);
        return response()->json([
            'status' => 'success',
            // 'user' => $user,
            'token' => $token,
        ]);
    }

    // public function logout()
    // {
    //     Auth::logout();
    //     return response()->json([
    //         'status' => 'success',
    //         'message' => 'Successfully logged out',
    //     ]);
    // }

    public function refresh()
    {
        $token = Auth::refresh();
        return response()->json([
            'status' => 'success',
            // 'user' => Auth::user(),
            'token' => $token,
        ]);
    }
}
