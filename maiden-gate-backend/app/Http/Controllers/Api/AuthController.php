<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'type' => 'required|in:master,player',
            'name' => 'required|string|max:255|unique:users,name',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create($data);

        return response()->json(['message' => 'usuario criado',
        'user' => $user], 201);
    } 

    public function login(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'password' => 'required',
        ]);

        $user = User::where('name', $data['name'])->first();

        if (!$user) {
            return response()->json(['message' => 'usuario nao encontrado'], 404);
        }

        if (!Hash::check($data['password'], $user->password)) {
            return response()->json(['message' => 'senha invalida'], 401);
        }

        return response()->json(['message' => 'login realizado', 'user' => $user], 200);
    }

    public function me() // ainda preciso implementar sanctum ou jwt 
    { 
        // return response()->json(
        //     auth()->user()
        // );
    }

    public function update(Request $request)
    {
    //     $user = auth()->user();

    //     $data = $request->validate([
    //         'name' => 'sometimes|string|max:255|unique:users,name,' . $user->id,
    //         'password' => 'sometimes|string|min:6',
    //         'type' => 'sometimes|in:master,player',
    //     ]);

    //     $user->update($data);

    //     return response()->json(['message' => 'perfil atualizado', 'user' => $user]);
    }
}
