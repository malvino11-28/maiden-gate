<?php

namespace App\Http\Controllers\Api;

use App\Models\Bestiary;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BestiaryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Bestiary::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate(['name' => 'required|string|max:255', 
        'description' => 'required|string',
        'skills' => 'required|array',
        'stats' => 'required|array'
        ]);

        $monster = Bestiary::create($data);

        return response()->json($monster, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $monster = Bestiary::findOrFail($id);

        return response()->json($monster);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $monster = Bestiary::findOrFail($id);

        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',

            'skills' => 'sometimes|array',
            'stats' => 'sometimes|array'
        ]);

        $monster->update($data);

        return response()->json($monster);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $monster = Bestiary::findOrFail($id);

        $monster->delete();

        return response()->json([
            'message' => 'Monstro removido com sucesso.'
        ]);
    }
}
