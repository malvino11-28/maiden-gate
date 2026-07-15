<?php

namespace App\Http\Controllers\Api;

use App\Models\LoreEvents;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Campaign;

class LoreEventsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Campaign $campaign)
    {
        return response()->json(
            $campaign->loreEvents()->latest()->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Campaign $campaign)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'chronology' => 'required|string|max:255',
            'event_date' => 'nullable|string|max:255',
            'visible_to_players' => 'nullable|boolean'
        ]);

        $lore = $campaign->loreEvents()->create([
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
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'chronology' => 'sometimes|string|max:255',
            'event_date' => 'sometimes|string|max:255',
            'visible_to_players' => 'sometimes|boolean'
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
