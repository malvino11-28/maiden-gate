<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Campaign;
use App\Models\CampaignUser;
use App\Models\Character;
use App\Models\User;

class CampaignUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(CampaignUser::with(['campaign', 'user'])->get());
    }

    /**
     * Store a newly created resou  rce in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'campaign_id' => 'required|exists:campaigns,id',
            'user_id' => 'required|exists:users,id',
            'role' => 'required|string'
        ]);

        $campaignUser = CampaignUser::create($data);

        return response()->json($campaignUser, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $campaignUser = CampaignUser::with(['campaign', 'user'])->findOrFail($id);

        return response()->json($campaignUser);
    }

    public function requestJoin(Request $request, Campaign $campaign)
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'character_id' => 'nullable|exists:characters,id',
        ]);

        if ($campaign->master_id === (int) $data['user_id']) {
            return response()->json([
                'message' => 'O mestre não pode solicitar entrada na própria campanha.',
            ], 422);
        }

        if (!empty($data['character_id'])) {
            Character::where('id', $data['character_id'])
                ->where('user_id', $data['user_id'])
                ->firstOrFail();
        }

        $requestEntry = CampaignUser::where('campaign_id', $campaign->id)
            ->where('user_id', $data['user_id'])
            ->first();

        if ($requestEntry && $requestEntry->status === 'accepted') {
            return response()->json([
                'message' => 'Você já participa desta campanha.',
            ], 409);
        }

        if ($requestEntry && $requestEntry->status === 'pending') {
            return response()->json([
                'message' => 'Você já solicitou entrada nesta campanha.',
            ], 409);
        }

        $requestEntry = CampaignUser::updateOrCreate(
            [
                'campaign_id' => $campaign->id,
                'user_id' => $data['user_id'],
            ],
            [
                'character_id' => $data['character_id'] ?? null,
                'status' => 'pending',
                'responded_at' => null,
                'response_message' => null,
            ],
        );

        return response()->json($requestEntry->load(['user', 'campaign', 'character']), 201);
    }

    public function pendingForMaster(User $user)
    {
        $requests = CampaignUser::where('status', 'pending')
            ->whereHas('campaign', function ($query) use ($user) {
                $query->where('master_id', $user->id);
            })
            ->with(['user', 'campaign', 'character'])
            ->latest()
            ->get();

        return response()->json($requests);
    }

    public function accept(Request $request, CampaignUser $campaignUser)
    {
        $campaignUser->update([
            'status' => 'accepted',
            'responded_at' => now(),
            'response_message' => $request->input('response_message'),
        ]);

        if ($campaignUser->character_id) {
            Character::where('id', $campaignUser->character_id)
                ->where('user_id', $campaignUser->user_id)
                ->update([
                    'campaign_id' => $campaignUser->campaign_id,
                ]);
        }

        return response()->json(
            $campaignUser->load(['user', 'campaign', 'character'])
        );
    }

    public function reject(Request $request, CampaignUser $campaignUser)
    {
        $campaignUser->update([
            'status' => 'rejected',
            'responded_at' => now(),
            'response_message' => $request->input('response_message'),
        ]);

        return response()->json(
            $campaignUser->load(['user', 'campaign', 'character'])
        );
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $campaignUser = CampaignUser::with(['campaign', 'user'])->findOrFail($id);

        $campaignUser->delete();
        
        return response()->json(['message' => 'participacao removido com sucesso']);
    } 
}
  