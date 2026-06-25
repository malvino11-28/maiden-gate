<?php

namespace App\Http\Controllers\Api;

use App\Models\Npcs;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NpcsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate(
            [
            'campaign_id' => 'required|integer|exists:campaign,id',
            'marca_id' => 'required|integer|exists:marca,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string',

            'skills' => 'nullable|array',
            'stats' => 'nullable|array'
            ]
        );

        $npc = Npcs::create($data);
        
        return response()->json($npc);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $npc = Npcs::findOrFail($id);

        return response()->json($npc);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $npc = Npcs::findOrFail($id);

        $data = $request->validate(
            [
            'marca_id' => 'sometimes|integer|exist:marca,id',
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',

            'skills' => 'sometimes|array',
            'stats' => 'sometimes|array'
            ]
        );

        $npc->update($data);
        
        return response()->json($npc);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $npc = Npcs::findOrFail($id);

        $npc->delete();

        return response()->json($npc);
    }
}
