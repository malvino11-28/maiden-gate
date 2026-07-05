<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CampaignSession;
use Illuminate\Http\Request;

class CampaignSessionController extends Controller
{
    /**
     * Display a listing of the resource for a specific campaign.
     */
    public function index(string $campaignId)
    {
        $sessions = CampaignSession::where('campaign_id', $campaignId)->get();

        return response()->json($sessions);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'campaign_id' => 'required|integer|exists:campaigns,id',
            'title'       => 'required|string|max:255',
            'date'        => 'required|date',
            'time'        => 'required|date_format:H:i',
            'description' => 'nullable|string',
            'status'      => 'nullable|in:em_espera,concluido,cancelado'
        ]);

        $session = CampaignSession::create($data);

        return response()->json($session, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $session = CampaignSession::with('campaign')->findOrFail($id);

        return response()->json($session);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $session = CampaignSession::findOrFail($id);

        $data = $request->validate([
            'title'       => 'sometimes|required|string|max:255',
            'date'        => 'sometimes|required|date',
            'time'        => 'sometimes|required|date_format:H:i',
            'description' => 'nullable|string',
            'status'      => 'sometimes|required|in:em_espera,concluido,cancelado'
        ]);

        $session->update($data);

        return response()->json($session);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $session = CampaignSession::findOrFail($id);
        $session->delete();

        return response()->json([
            'message' => 'Sessão removida com sucesso.'
        ]);
    }
}