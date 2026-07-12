<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Character;
use App\Models\Inventory;
use App\Models\Items;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Character $character)
    {
        return response()->json(
            $character->inventory()->with('item')->latest()->get()
        );  
    }

    /**
     * Store a newly created resource in storage.
     */


public function store(Request $request, Character $character)
{
    $data = $request->validate([
        'item_id' => 'required|exists:items,id',
        'quantity' => 'required|integer|min:1',
    ]);

    $item = Items::findOrFail($data['item_id']);

    if (
        $item->campaign_id !== null &&
        $character->campaign_id !== null &&
        $item->campaign_id !== $character->campaign_id
    ) {
        return response()->json([
            'message' => 'Este item não pertence à campanha do personagem.',
        ], 422);
    }

    $inventory = Inventory::where('character_id', $character->id)
        ->where('item_id', $data['item_id'])
        ->first();

    if ($inventory) {
        $inventory->increment('quantity', $data['quantity']);

        return response()->json($inventory->fresh());
    }

    $inventory = Inventory::create([
        'character_id' => $character->id,
        'item_id' => $data['item_id'],
        'quantity' => $data['quantity'],
    ]);

    return response()->json($inventory, 201);
}
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $inventory = Inventory::with('item')->findOrFail($id);

        return response()->json($inventory);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $inventory = Inventory::findOrFail($id);

        $data = $request->validate([
            'quantity' => 'required|integer|min:0'
        ]);

        $inventory->update($data);

        if ($inventory->quantity == 0) {
            $inventory->delete();

            return response()->json(['message' => 'item removido do inventário']);
        }

        return response()->json($inventory->fresh()->load('item'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $inventory = Inventory::findOrFail($id);

        $inventory->delete();

        return response()->json(['message' => 'item removido do inventário']);
    }
}
