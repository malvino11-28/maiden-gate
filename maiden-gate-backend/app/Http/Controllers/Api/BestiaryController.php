<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Bestiary;
use App\Models\Campaign;
use App\Models\CampaignCollection;
use Illuminate\Http\Request;

class BestiaryController extends Controller
{
    /**
     * Display a listing of monsters from a specific campaign.
     */
    public function index(Campaign $campaign)
    {
        return response()->json(
            $campaign->bestiary()->with('collection')->latest()->get()
        );
    }

    /**
     * Store a newly created monster in a specific campaign.
     */
    public function store(Request $request, Campaign $campaign)
    {
        $data = $request->validate([
            'collection_id' => 'nullable|integer',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'name' => 'required|string|max:255',
            'type' => 'nullable|string|max:255',
            'threat' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'skills' => 'nullable|array',
            'stats' => 'nullable|array',
            'visible_to_players' => 'nullable|boolean',
        ]);

        $collectionId = $data['collection_id'] ?? null;

        if ($collectionId) {
            CampaignCollection::where('id', $collectionId)
                ->where('campaign_id', $campaign->id)
                ->firstOrFail();
        }

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('bestiary', 'public');
        }

        $monster = $campaign->bestiary()->create([
            'collection_id' => $collectionId,
            'image' => $imagePath,
            'name' => $data['name'],
            'type' => $data['type'] ?? null,
            'threat' => $data['threat'] ?? null,
            'description' => $data['description'] ?? null,
            'skills' => $data['skills'] ?? null,
            'stats' => $data['stats'] ?? null,
            'visible_to_players' => $data['visible_to_players'] ?? false,
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
            'collection_id' => 'sometimes|nullable|integer',
            'image' => 'sometimes|nullable|string|max:255',
            'name' => 'sometimes|string|max:255',
            'threat' => 'sometimes|nullable|string|max:255',
            'type' => 'sometimes|nullable|string|max:255',
            'description' => 'sometimes|string',
            'skills' => 'sometimes|nullable|array',
            'stats' => 'sometimes|nullable|array',
            'visible_to_players' => 'sometimes|boolean',
        ]);

        if (array_key_exists('collection_id', $data) && $data['collection_id']) {
            CampaignCollection::where('id', $data['collection_id'])
                ->where('campaign_id', $monster->campaign_id)
                ->firstOrFail();
        }

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