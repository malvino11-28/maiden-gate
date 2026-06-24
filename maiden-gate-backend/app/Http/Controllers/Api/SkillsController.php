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
            'marca_id' => 'required|integer|exists:marca,id',
            'name' => 'required|string|max:255',
            'desc' => 'required|string',
            'categoria' => 'required|string',
            'unlock_level' => 'required|integer|min:1',
            'resource_cost' => 'required|integer|min:0',
            'alcance' => 'nullable|string'
        ]);

        $skill = Skills::create($data);

        return response()->json($skill);
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
            'name' => 'sometimes|string|max:255',
            'desc' => 'sometimes|string',
            'categoria' => 'sometimes|string',
            'unlock_level' => 'sometimes|integer|min:1',
            'resource_cost' => 'sometimes|integer|min:0',
            'alcance' => 'sometimes|string'
        ]);

        $skill = Skills::update($data);

        return response()->json($skill);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $skill = Skills::findOrFail($id);

        $skill->delete();

        return response()->json($skill);
    }
}
