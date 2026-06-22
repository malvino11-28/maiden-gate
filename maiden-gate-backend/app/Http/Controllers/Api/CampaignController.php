<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use Illuminate\Http\Request;

class CampaignController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Campaign::with('master')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'master_id' => 'sometimes|required|exists:users,id',
            'name' => 'sometimes|required|string',
            'description' => 'sometimes|nullable|string',
        ]);

        $campaign = Campaign::create($data);

        return response()->json($campaign, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Campaign $campaign)
    {
        $campaign->load(['master', 'characters', 'users']);

        return response()->json($campaign);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Campaign $campaign)
    {
        $data = $request->validate([
            'master_id' => 'sometimes|required|exists:user,id',
            'name' => 'sometimes|required|string',
            'description' => 'sometimes|nullable|string',
        ]);

        $campaign->update($data);

        return response()->json($campaign);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Campaign $campaign)
    {
        $campaign->delete();

        return response()->json([
            'message' => 'campanha excluida com sucesso'
        ]);
    }
}
