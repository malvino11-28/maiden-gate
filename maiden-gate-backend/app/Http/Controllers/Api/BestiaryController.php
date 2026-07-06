<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Bestiary;
use App\Models\Campaign;
use Illuminate\Http\Request;

class BestiaryController extends Controller
{
    /**
     * Display a listing of monsters from a specific campaign.
     */
    public function index(Campaign $campaign)
    {
        return response()->json(
            $campaign->bestiary()->latest()->get()
        );
    }

    /**
     * Store a newly created monster in a specific campaign.
     */
    public function store(Request $request, Campaign $campaign)
    {
        $data = $request->validate([
            'image' => 'nullable|string|max:255',
            'name' => 'required|string|max:255',
            'threat' => 'nullable|string|max:255',
            'type' => 'nullable|string|max:255',
            'description' => 'required|string',
            'skills' => 'nullable|array',
            'stats' => 'nullable|array',
        ]);

        $monster = $campaign->bestiary()->create([
            'image' => $data['image'] ?? null,
            'name' => $data['name'],
            'threat' => $data['threat'] ?? null,
            'type' => $data['type'] ?? null,
            'description' => $data['description'],
            'skills' => $data['skills'] ?? [],
            'stats' => $data['stats'] ?? [],
        ]);

        return response()->json($monster, 201);
    }

    /**
     * Display the specified monster.
     */
    public function show(string $id)
    {
        $monster = Bestiary::findOrFail($id);

        return response()->json($monster);
    }

    /**
     * Update the specified monster.
     */
    public function update(Request $request, string $id)
    {
        $monster = Bestiary::findOrFail($id);

        $data = $request->validate([
            'image' => 'sometimes|nullable|string|max:255',
            'name' => 'sometimes|string|max:255',
            'threat' => 'sometimes|nullable|string|max:255',
            'type' => 'sometimes|nullable|string|max:255',
            'description' => 'sometimes|string',
            'skills' => 'sometimes|nullable|array',
            'stats' => 'sometimes|nullable|array',
        ]);

        $monster->update($data);

        return response()->json($monster);
    }

    /**
     * Remove the specified monster.
     */
    public function destroy(string $id)
    {
        $monster = Bestiary::findOrFail($id);

        $monster->delete();

        return response()->json([
            'message' => 'Monstro removido com sucesso.',
        ]);
    }
}