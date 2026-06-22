<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CampaignUser;

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
            'campaign_id' => 'required|exists:campaigns, id',
            'user_id' => 'required|exists:users, id',
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
        $campaignUser = CampaignUser::with(['campaign, user'])->findOrFail($id);

        return response()->json($campaignUser);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $campaignUser = CampaignUser::with(['campaign, user'])->findOrFail($id);

        $campaignUser->delete();
        
        return response()->json(['message' => 'participacao removido com suceop']);
    } 
}
  