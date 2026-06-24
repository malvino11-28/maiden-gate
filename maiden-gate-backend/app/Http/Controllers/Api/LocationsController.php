<?php

namespace App\Http\Controllers\Api;

use App\Models\Locations;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LocationsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Locations::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'campaign_id' => 'nullable|exist:campaign,id',
            'name' => 'required|string|max:255',
            'type' => 'required|string',
            'description' => 'required|string'
        ]);

        $location = Locations::create($data);

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
            'name' => 'sometimes|string|max:255',
            'type' => 'sometimes|string',
            'description' => 'sometimes|string'
        ]);

        $location = Locations::update($data);

        return response()->json($location);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $location = Locations::findOrFail($id);

        $location->delete();

        return response($location);
    }
}
