<?php

namespace App\Http\Controllers\Api;

use App\Models\Locations;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Campaign;

class LocationsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Campaign $campaign)
    {
        return response()->json(
            $campaign->locations()->latest()->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Campaign $campaign)
    {
        $data = $request->validate([
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'region' => 'nullable|string|max:255',
            'description' => 'required|string',
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('locations', 'public');
        }

        $location = $campaign->locations()->create([
            'image' => $imagePath,
            'name' => $data['name'],
            'type' => $data['type'],
            'region' => $data['region'] ?? null,
            'description' => $data['description'],
        ]);

        return response()->json($location, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $location = Locations::findOrFail($id);

        return response()->json($location);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $location = Locations::findOrFail($id);

        $data = $request->validate([
            'image' => 'sometimes|string|max:255',
            'name' => 'sometimes|string|max:255',
            'type' => 'sometimes|string',
            'region' => 'sometimes|string|max:255',
            'description' => 'sometimes|string'
        ]);

        $location->update($data);

        return response()->json($location);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $location = Locations::findOrFail($id);

        $location->delete();

        return response()->json($location);
    }
}
