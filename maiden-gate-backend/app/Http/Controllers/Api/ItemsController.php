<?php

namespace App\Http\Controllers\Api;

use App\Models\Items;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Campaign;

class ItemsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
public function index(Campaign $campaign)
{
    return response()->json(
        $campaign->items()->latest()->get()
    );
}


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Campaign $campaign)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'nullable|string'
        ]);

        $items = $campaign->items()->create([
            'name' => $data['name'],
            'description' => $data['description'],
            'type' => $data['type'] ?? null
        ]);

        return response()->json($items, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $items = Items::findOrFail($id);

        return response()->json($items);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $items = Items::findOrFail($id);

        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'type' => 'sometimes|string'
        ]);

        $items->update($data);

        return response()->json(['message' => 'item atualizado', 'item' => $items]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $items = Items::findOrFail($id);

        $items->delete();

        return response()->json(['message' => 'item excluido']);
    }
}
