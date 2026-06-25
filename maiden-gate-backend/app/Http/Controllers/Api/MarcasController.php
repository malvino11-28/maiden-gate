<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Marcas;
use Illuminate\Http\Request;

class MarcasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Marcas::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|unique:marcas,name',
            'description' => 'required|string',
        ]); // validando

        $marca = Marcas::create($data);

        return response()->json($marca, 201); // retornando 201 em json
    }

    /**
     * Display the specified resource.
     */
    public function show(Marcas $marca)
    {
        return response()->json($marca);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Marcas $marca)
    {
        $data = $request->validate([
            'name' => 'sometimes|required|string|unique:marcas,name,' . $marca->id,
            'description' => 'sometimes|required|string',
        ]);

        $marca->update($data);

        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Marcas $marca)
    {
        $marca->delete();

        return response()->json([
            'message' => 'marca excluída com sucesso.'
        ]);
    }
}
