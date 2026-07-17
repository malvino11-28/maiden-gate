<?php

namespace App\Http\Controllers\Api;

use App\Models\Npcs;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Campaign;
use App\Models\CampaignCollection;

class NpcsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Campaign $campaign)
    {
        return response()->json(
            $campaign->npcs()->with(['collection', 'marca'])->latest()->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Campaign $campaign)
    {
        $data = $request->validate([
            'collection_id' => 'nullable|integer',
            'marca_id' => 'nullable|integer|exists:marcas,id',
            'name' => 'required|string|max:255',
            'race' => 'nullable|string|max:255',
            'occupation' => 'nullable|string|max:255',
            'personality' => 'nullable|string',
            'secret' => 'nullable|string',
            'description' => 'nullable|string',
            'skills' => 'nullable|array',
            'stats' => 'nullable|array',
            'visible_to_players' => 'nullable|boolean'
        ]);

        $collectionId = $data['collection_id'] ?? null;

        if ($collectionId) {
            CampaignCollection::where('id', $collectionId)
                ->where('campaign_id', $campaign->id)
                ->firstOrFail();
        }

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('npc', 'public');
        }

        $npc = $campaign->npcs()->create([
            'collection_id' => $collectionId,
            'marca_id' => $data['marca_id'] ?? null,
            'image' => $imagePath,
            'name' => $data['name'],
            'race' => $data['race'] ?? null,
            'occupation' => $data['occupation'] ?? null,
            'personality' => $data['personality'] ?? null,
            'secret' => $data['secret'] ?? null,
            'description' => $data['description'] ?? null,
            'skills' => $data['skills'] ?? [],
            'stats' => $data['stats'] ?? [],
            'visible_to_players' => $data['visible_to_players'] ?? false
        ]);
        
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
            'collection_id' => 'nullable|integer',
            'marca_id' => 'nullable|integer|exists:marcas,id',

            'name' => 'sometimes|string|max:255',
            'race' => 'nullable|string|max:255',
            'occupation' => 'nullable|string|max:255',
            'personality' => 'nullable|string',
            'secret' => 'nullable|string',
            'description' => 'nullable|string',

            'skills' => 'sometimes|nullable|array',
            'stats' => 'sometimes|nullable|array',
            'visible_to_players' => 'sometimes|boolean'
        ]);

        if (array_key_exists('collection_id', $data) && $data['collection_id']) {
            CampaignCollection::where('id', $data['collection_id'])
                ->where('campaign_id', $npc->campaign_id)
                ->firstOrFail();
        }

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