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
    public function index(string $campaignId)
    {
        $npcs = Npcs::where('campaign_id', $campaignId)->get();

        return response()->json($npcs);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'campaign_id' => 'required|integer|exists:campaigns,id',
            'marca_id' => 'nullable|integer|exists:marcas,id',
            'name' => 'required|string|max:255',
            'race' => 'nullable|string|max:255',
            'occupation' => 'nullable|string|max:255',
            'personality' => 'nullable|string',
            'secret' => 'nullable|string',
            'description' => 'nullable|string',
            'skills' => 'nullable|array',
            'stats' => 'nullable|array'
        ]);

        $npc = Npcs::create($data);
        
        return response()->json($npc, 201);
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

        $data = $request->validate([
            'campaign_id' => 'sometimes|required|integer|exists:campaigns,id',
            'marca_id' => 'nullable|integer|exists:marcas,id',

            'name' => 'sometimes|string|max:255',
            'race' => 'nullable|string|max:255',
            'occupation' => 'nullable|string|max:255',
            'personality' => 'nullable|string',
            'secret' => 'nullable|string',
            'description' => 'nullable|string',

            'skills' => 'sometimes|nullable|array',
            'stats' => 'sometimes|nullable|array'
        ]);

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

        return response()->json(['message' => 'NPC removido com sucesso.']);
    }
}