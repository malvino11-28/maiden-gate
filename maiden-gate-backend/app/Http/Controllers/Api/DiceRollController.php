<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use App\Models\DiceRoll;
use Illuminate\Http\Request;

class DiceRollController extends Controller
{
    public function index(Campaign $campaign)
    {
        $rolls = $campaign->diceRolls()
            ->with(['user', 'character'])
            ->latest()
            ->limit(80)
            ->get()
            ->reverse()
            ->values();

        return response()->json($rolls);
    }

    public function store(Request $request, Campaign $campaign)
    {
        $data = $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'character_id' => 'nullable|exists:characters,id',
            'author_name' => 'required|string|max:255',
            'author_type' => 'required|in:master,player',
            'dice' => 'required|integer|in:4,6,8,10,12,20,100',
            'quantity' => 'required|integer|min:1|max:10',
            'modifier' => 'nullable|integer|min:-999|max:999',
        ]);

        $modifier = $data['modifier'] ?? 0;

        $results = [];

        for ($i = 0; $i < $data['quantity']; $i++) {
            $results[] = random_int(1, $data['dice']);
        }

        $total = array_sum($results) + $modifier;
        $critical = $data['dice'] === 20 && in_array(20, $results, true);
        $failure = $data['dice'] === 20 && in_array(1, $results, true);

        $roll = $campaign->diceRolls()->create([
            'user_id' => $data['user_id'] ?? null,
            'character_id' => $data['character_id'] ?? null,
            'author_name' => $data['author_name'],
            'author_type' => $data['author_type'],
            'dice' => $data['dice'],
            'quantity' => $data['quantity'],
            'modifier' => $modifier,
            'results' => $results,
            'total' => $total,
            'critical' => $critical,
            'failure' => $failure,
        ]);

        return response()->json($roll->load(['user', 'character']), 201);
    }

    public function destroy(Request $request, Campaign $campaign) {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        if ((int) $campaign->master_id !== (int) $data['user_id']) {
            return response()->json([
                'message' => 'Apenas mestres podem limpar o histórico de rolagens.',
            ], 403);
        }

        DiceRoll::where('campaign_id', $campaign->id)->delete();

        return response()->json([
            'message' => 'Histórico de rolagens limpo com sucesso.',
        ]);
    }
}
