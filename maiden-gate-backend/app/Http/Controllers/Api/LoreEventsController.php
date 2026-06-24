<?php

namespace App\Http\Controllers\Api;

use App\Models\LoreEvents;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoreEventsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $campaignId)
    {
        $lore = LoreEvents::where('campaign_id', $campaignId)->get();

        return response()->json($lore);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'chronology' => 'required|string|max:255',
            'event_date' => 'nullable|string|max:255'
        ]);

        $lore = LoreEvents::create($data);

        return response()->json($lore);
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
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'chronology' => 'sometimes|string|max:255',
            'event_date' => 'sometimes|string|max:255'
        ]);

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
