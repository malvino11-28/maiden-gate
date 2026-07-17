<?php

namespace App\Http\Controllers\Api;

use App\Models\LoreEvents;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Campaign;
use App\Models\CampaignCollection;

class LoreEventsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Campaign $campaign)
    {
        return response()->json(
            $campaign->loreEvents()->with('collection')->latest()->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Campaign $campaign)
    {
        $data = $request->validate([
            'collection_id' => 'nullable|integer',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'chronology' => 'required|string|max:255',
            'event_date' => 'nullable|string|max:255',
            'visible_to_players' => 'nullable|boolean'
        ]);

        $collectionId = $data['collection_id'] ?? null;

        if ($collectionId) {
            CampaignCollection::where('id', $collectionId)
                ->where('campaign_id', $campaign->id)
                ->firstOrFail();
        }

        $lore = $campaign->loreEvents()->create([
            'collection_id' => $collectionId,
            'title' => $data['title'],
            'description' => $data['description'],
            'chronology' => $data['chronology'],
            'event_date' => $data['event_date'] ?? null,
            'visible_to_players' => $data['visible_to_players'] ?? false
        ]);

        return response()->json($lore, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $lore = LoreEvents::findOrFail($id);

        return response()->json($lore);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $lore = LoreEvents::findOrFail($id);

        $data = $request->validate([
            'collection_id' => 'sometimes|nullable|integer',
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'chronology' => 'sometimes|string|max:255',
            'event_date' => 'sometimes|string|max:255',
            'visible_to_players' => 'sometimes|boolean'
        ]);

        if (array_key_exists('collection_id', $data) && $data['collection_id']) {
            CampaignCollection::where('id', $data['collection_id'])
                ->where('campaign_id', $lore->campaign_id)
                ->firstOrFail();
        }

        $lore->update($data);

        return response()->json($lore);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $lore = LoreEvents::findOrFail($id);

        $lore->delete();

        return response()->json();
    }
}
