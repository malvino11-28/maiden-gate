<?php

namespace App\Http\Controllers\Api;

use App\Models\Inventory;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $characterId)
    {
        $inventory = Inventory::with('item')
            ->where('character_id', $characterId)
            ->get();
        
        return response()->json($inventory);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'character_id' => 'required|exists:characters,id',
            'item_id' => 'required|exists:items,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $item = Inventory::where('character_id', $data['character_id'])
            ->where('item_id', $data['item_id'])
            ->first();

        if ($item) {
            $item->increment('quantity', $data['quantity']);
            
            return response()->json($item);
        }

        $inventory = Inventory::create($data);

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

        return response()->json(['message' => 'item adicionado ao inventário', 'item' => $inventory]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $inventory = Inventory::findOrFail($id);

        $inventory->delete();

        return response()->json($inventory);
    }
}
