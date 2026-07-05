<?php

namespace App\Http\Controllers\Api;

use App\Models\Skills;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SkillsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Skills::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'marca_id' => 'nullable|integer|exists:marcas,id',
            'campaign_id' => 'nullable|integer|exists:campaigns,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|in:ativa,passiva,penalidade,campanha',
            'branch' => 'nullable|in:ofensivo,suporte,destreza,passivas,penalidade,campanha',
            'image' => 'nullable|string|max:255',
            'unlock_level' => 'nullable|integer|min:1',
            'resource_cost' => 'nullable|integer|min:0',
            'range' => 'nullable|string|max:255'
        ]);

        $skill = Skills::create($data);

        return response()->json($skill, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $skill = Skills::findOrFail($id);

        return response()->json($skill);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $skill = Skills::findOrFail($id);

        $data = $request->validate([
            'marca_id' => 'sometimes|nullable|integer|exists:marcas,id',
            'campaign_id' => 'sometimes|nullable|integer|exists:campaigns,id',
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'type' => 'sometimes|required|in:ativa,passiva,penalidade,campanha',
            'branch' => 'nullable|in:ofensivo,suporte,destreza,passivas,penalidade,campanha',
            'image' => 'nullable|string|max:255',
            'unlock_level' => 'sometimes|integer|min:1',
            'resource_cost' => 'sometimes|integer|min:0',
            'range' => 'nullable|string|max:255'
        ]);

        $skill->update($data);

        return response()->json($skill);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $skill = Skills::findOrFail($id);
        $skill->delete();

        return response()->json(['message' => 'habilidade excluida']);
    }
}