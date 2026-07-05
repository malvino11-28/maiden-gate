<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CampaignSession;
use Illuminate\Http\Request;
use App\Models\Campaign;

class CampaignSessionController extends Controller
{
    /**
     * Display a listing of the resource for a specific campaign.
     */
    public function index(Campaign $campaign)
    {
        return response()->json(
            $campaign->sessions()->latest()->get()
        );
    }

    public function store(Request $request, Campaign $campaign)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
            'description' => 'nullable|string',
            'status' => 'nullable|in:em_espera,concluido,cancelado',
        ]);

        $session = $campaign->sessions()->create([
            ...$data,
            'status' => $data['status'] ?? 'em_espera',
        ]);

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

    public function updateStatus(Request $request, CampaignSession $campaignSession)
    {
        $data = $request->validate([
            'status' => 'required|in:em_espera,concluido,cancelado',
        ]);

        $campaignSession->update($data);

        return response()->json($campaignSession);
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