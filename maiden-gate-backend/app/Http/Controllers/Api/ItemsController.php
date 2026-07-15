<?php

namespace App\Http\Controllers\Api;

use App\Models\Items;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Campaign;
use App\Models\CampaignCollection;

class ItemsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
public function index(Campaign $campaign)
{
    return response()->json(
        $campaign->items()->with('collection')->latest()->get()
    );
}


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Campaign $campaign)
    {
        $data = $request->validate([
            'collection_id' => 'nullable|integer',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'nullable|string',
            'visible_to_players' => 'nullable|boolean'
        ]);

        $collectionId = $data['collection_id'] ?? null;

        if ($collectionId) {
            CampaignCollection::where('id', $collectionId)
                ->where('campaign_id', $campaign->id)
                ->firstOrFail();
        }

        $items = $campaign->items()->create([
            'collection_id' => $collectionId,
            'name' => $data['name'],
            'description' => $data['description'],
            'type' => $data['type'] ?? null,
            'visible_to_players' => $data['visible_to_players'] ?? false
        ]);

        return response()->json($items, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $items = Items::findOrFail($id);

        return response()->json($items);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $items = Items::findOrFail($id);

        $data = $request->validate([
            'collection_id' => 'sometimes|nullable|integer',
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'type' => 'sometimes|string',
            'visible_to_players' => 'sometimes|boolean'
        ]);

        if (array_key_exists('collection_id', $data) && $data['collection_id']) {
            CampaignCollection::where('id', $data['collection_id'])
                ->where('campaign_id', $items->campaign_id)
                ->firstOrFail();
        }

        $items->update($data);

        return response()->json(['message' => 'item atualizado', 'item' => $items]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $items = Items::findOrFail($id);

        $items->delete();

        return response()->json(['message' => 'item excluido']);
    }
}
