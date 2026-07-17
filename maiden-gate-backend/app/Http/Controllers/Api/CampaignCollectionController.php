<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use App\Models\CampaignCollection;
use Illuminate\Http\Request;

class CampaignCollectionController extends Controller
{
    public function index(Campaign $campaign)
    {
        return response()->json(
            $campaign
                ->collections()
                ->orderBy('sort_order')
                ->orderBy('name')
                ->get()
        );
    }

    public function store(Request $request, Campaign $campaign)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'color' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer|min:0',
            'visible_to_players' => 'nullable|boolean',
        ]);

        $collection = $campaign->collections()->create([
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
            'color' => $data['color'] ?? null,
            'sort_order' => $data['sort_order'] ?? 0,
            'visible_to_players' => $data['visible_to_players'] ?? false,
        ]);

        return response()->json($collection, 201);
    }

    public function update(Request $request, CampaignCollection $campaignCollection)
    {
        $data = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'color' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer|min:0',
            'visible_to_players' => 'nullable|boolean',
        ]);

        $campaignCollection->update($data);

        return response()->json($campaignCollection);
    }

    public function destroy(CampaignCollection $campaignCollection)
    {
        $campaignCollection->delete();

        return response()->json([
            'message' => 'Conjunto removido com sucesso.',
        ]);
    }
}
