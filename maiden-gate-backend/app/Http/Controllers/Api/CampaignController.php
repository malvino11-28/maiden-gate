<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Campaign;
use App\Models\Locations;
use App\Models\Npcs;
use App\Models\Items;
use App\Models\Bestiary;
use App\Models\LoreEvents;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CampaignController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Campaign::with('master')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'master_id' => 'required|exists:users,id',

            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string|max:255',
            'recommended_level' => 'required|in:Iniciante,Intermediário,Avançado',
            'players' => 'nullable|string|max:255',
            'status' => 'nullable|in:ativa,pausada,encerrada',
            'notes' => 'nullable|string',

            'locations' => 'sometimes|array',
            'locations.*.name' => 'required|string|max:255',
            'locations.*.type' => 'nullable|string|max:255',
            'locations.*.region' => 'nullable|string|max:255',
            'locations.*.description' => 'nullable|string',

            'npcs' => 'sometimes|array',
            'npcs.*.marca_id' => 'nullable|exists:marcas,id',
            'npcs.*.name' => 'required|string|max:255',
            'npcs.*.race' => 'nullable|string|max:255',
            'npcs.*.occupation' => 'nullable|string|max:255',
            'npcs.*.personality' => 'nullable|string',
            'npcs.*.secret' => 'nullable|string',
            'npcs.*.description' => 'nullable|string',
            'npcs.*.skills' => 'nullable|array',
            'npcs.*.stats' => 'nullable|array',

            'monsters' => 'sometimes|array',
            'monsters.*.name' => 'required|string|max:255',
            'monsters.*.type' => 'nullable|string|max:255',
            'monsters.*.threat' => 'nullable|string|max:255',
            'monsters.*.description' => 'nullable|string',
            'monsters.*.skills' => 'nullable',
            'monsters.*.stats' => 'nullable|array',

            'items' => 'sometimes|array',
            'items.*.name' => 'required|string|max:255',
            'items.*.type' => 'nullable|string|max:255',
            'items.*.description' => 'nullable|string',

            'events' => 'sometimes|array',
            'events.*.title' => 'required|string|max:255',
            'events.*.chronology' => 'nullable|string|max:255',
            'events.*.date' => 'nullable|string|max:255',
            'events.*.description' => 'nullable|string',

            'image' => 'nullable',
            'npcs.*.image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'monsters.*.image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $campaign = DB::transaction(function () use ($data) {
            $campaign = Campaign::create([
                'master_id' => $data['master_id'],
                'name' => $data['name'],
                'description' => $data['description'] ?? null,
                'image' => $data['image'] ?? null,
                'recommended_level' => $data['recommended_level'],
                'players' => $data['players'] ?? null,
                'status' => $data['status'] ?? 'ativa',
                'notes' => $data['notes'] ?? null,
            ]);

            foreach ($data['locations'] ?? [] as $location) {
                $campaign->locations()->create([
                    'name' => $location['name'],
                    'type' => $location['type'] ?? '',
                    'region' => $location['region'] ?? null,
                    'description' => $location['description'] ?? null,
                ]);
            }

            foreach ($data['npcs'] ?? [] as $npc) {
                $campaign->npcs()->create([
                    'marca_id' => $npc['marca_id'] ?? null,
                    'name' => $npc['name'],
                    'race' => $npc['race'] ?? null,
                    'occupation' => $npc['occupation'] ?? null,
                    'personality' => $npc['personality'] ?? null,
                    'secret' => $npc['secret'] ?? null,
                    'description' => $npc['description'] ?? null,
                    'skills' => $npc['skills'] ?? null,
                    'stats' => $npc['stats'] ?? null,
                    'image' => isset($npc['image'])
                    ? $npc['image']->store('npcs', 'public')
                    : null,
                ]);
            }

            foreach ($data['monsters'] ?? [] as $monster) {
                $campaign->bestiary()->create([
                    'name' => $monster['name'],
                    'type' => $monster['type'] ?? null,
                    'threat' => $monster['threat'] ?? null,
                    'description' => $monster['description'] ?? null,
                    'skills' => is_array($monster['skills'] ?? null)
                        ? $monster['skills']
                        : ['summary' => $monster['skills'] ?? null],
                    'stats' => $monster['stats'] ?? null,
                    'image' => isset($monster['image'])
                    ? $monster['image']->store('bestiary', 'public')
                    : null,
                ]);
            }

            foreach ($data['items'] ?? [] as $item) {
                $campaign->items()->create([
                    'name' => $item['name'],
                    'type' => $item['type'] ?? null,
                    'description' => $item['description'] ?? null,
                ]);
            }

            foreach ($data['events'] ?? [] as $event) {
                $campaign->loreEvents()->create([
                    'title' => $event['title'],
                    'chronology' => $event['chronology'] ?? null,
                    'event_date' => $event['date'] ?? null,
                    'description' => $event['description'] ?? null,
                ]);
            }

            return $campaign;
        });

        return response()->json(
            $campaign->load([
                'locations',
                'npcs',
                'items',
                'bestiary',
                'loreEvents',
                'sessions',
                'currentLocation',
            ]),
            201
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Campaign $campaign)
    {
        $campaign->load(['master', 'characters', 'users']);

        return response()->json($campaign);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Campaign $campaign)
    {

        $data = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'recommended_level' => 'sometimes|required|in:Iniciante,Intermediário,Avançado',
            'players' => 'nullable|string|max:255',
            'status' => 'sometimes|required|in:ativa,pausada,encerrada',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('campaigns', 'public');
        }

        $campaign->update($data);

        return response()->json($campaign);
    }

    public function masterCampaigns(User $user)
    {
        $campaigns = Campaign::where('master_id', $user->id)
            ->withCount(['characters', 'sessions'])
            ->latest()
            ->get();

        return response()->json($campaigns);
    }

    public function playerCampaigns(User $user)
    {
        $campaigns = $user->campaigns()
            ->with(['master', 'sessions'])
            ->latest()
            ->get();

        return response()->json($campaigns);
    }

    public function available()
    {
        $campaigns = Campaign::where('status', 'ativa')
            ->with('master')
            ->latest()
            ->get();

        return response()->json($campaigns);
    }

    public function masterView(Campaign $campaign)
    {
        $campaign->load([
            'master',
            'characters.user',
            'characters.marca',
            'users',
            'locations',
            'npcs',
            'items',
            'bestiary',
            'loreEvents',
            'sessions',
            'currentLocation',
        ]);

        return response()->json($campaign);
    }

    public function playerView(Request $request, Campaign $campaign)
    {
        $campaign->load([
            'master',
            'users',
            'locations',
            'npcs',
            'items',
            'bestiary',
            'loreEvents',
            'sessions',
            'currentLocation',
        ]);

        if ($request->filled('character_id')) {
            $campaign->load([
                'characters' => function ($query) use ($request) {
                    $query
                        ->where('id', $request->character_id)
                        ->with(['marca', 'skills', 'inventory.item']);
                },
            ]);
        } else {
            $campaign->load(['characters.marca']);
        }

        return response()->json($campaign);
    }

    public function updateNotes(Request $request, Campaign $campaign)
    {
        $data = $request->validate([
            'notes' => 'nullable|string',
        ]);

        $campaign->update($data);

        return response()->json($campaign);
    }

    public function updateCurrentLocation(Request $request, Campaign $campaign)
    {
        $data = $request->validate([
            'current_location_id' => 'required|exists:locations,id',
        ]);

        $location = Locations::where('id', $data['current_location_id'])
            ->where('campaign_id', $campaign->id)
            ->firstOrFail();

        $campaign->update([
            'current_location_id' => $location->id,
        ]);

        return response()->json(
            $campaign->load('currentLocation')
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Campaign $campaign)
    {
        $campaign->delete();

        return response()->json([
            'message' => 'campanha excluida com sucesso'
        ]);
    }
}