<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Character;
use App\Models\User;
use Illuminate\Http\Request;

class CharacterController extends Controller
{
    public function index()
    {
        return response()->json(
            Character::with(['user', 'campaign', 'marca', 'skills'])->get()
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'campaign_id' => 'nullable|exists:campaigns,id',
            'marca_id' => 'required|exists:marcas,id',

            'name' => 'required|string|max:255',
            'surname' => 'nullable|string|max:255',
            'origin' => 'nullable|string|max:255',
            'lore' => 'nullable|string',

            'image' => 'nullable|string|max:255',
            'icon_image' => 'nullable',
            'full_image' => 'nullable',

            'pod' => 'required|integer|min:0',
            'des' => 'required|integer|min:0',
            'res' => 'required|integer|min:0',
            'int' => 'required|integer|min:0',
            'det' => 'required|integer|min:0',
            'pre' => 'required|integer|min:0',

            'skills' => 'nullable|array|max:6',
            'skills.*' => 'integer|exists:skills,id',
        ]);

        $data['level'] = 1;
        $data['exp'] = 0;
        $data['hp_max'] = (int) floor($data['res'] * 1.5);
        $data['hp_current'] = $data['hp_max'];

        $data['pa_max'] = max(1, 4 + floor($data['int'] * 0.6) + floor($data['des'] * 0.2));
        $data['pr_max'] = max(1, 1 + floor($data['des'] * 0.25) + floor($data['det'] * 0.1));

        if ($request->hasFile('icon_image')) {
            $data['icon_image'] = $request->file('icon_image')->store('characters/icons', 'public');
        } elseif ($request->filled('icon_image')) {
            $data['icon_image'] = $request->input('icon_image');
        } else {
            unset($data['icon_image']);
        }

        if ($request->hasFile('full_image')) {
            $data['full_image'] = $request->file('full_image')->store('characters/full', 'public');
        } elseif ($request->filled('full_image')) {
            $data['full_image'] = $request->input('full_image');
        } else {
            unset($data['full_image']);
        }

        if (empty($data['image']) && !empty($data['full_image'])) {
            $data['image'] = $data['full_image'];
        }

        $skillIds = collect($data['skills'] ?? [])
            ->unique()
            ->take(6)
            ->values()
            ->all();

        unset($data['skills']);

        $character = Character::create($data);

        if (!empty($skillIds)) {
            $syncPayload = collect($skillIds)->mapWithKeys(function ($skillId) {
                return [$skillId => ['unlocked' => true, 'equipped' => true]];
            })->all();

            $character->skills()->syncWithoutDetaching($syncPayload);
        }

        return response()->json(
            $character->load(['marca', 'campaign', 'skills']),
            201
        );
    }

    public function show(string $id)
    {
        $character = Character::with(['user', 'campaign', 'marca', 'skills', 'inventory.item'])
            ->findOrFail($id);

        return response()->json($character);
    }

    public function update(Request $request, string $id)
    {
        $character = Character::findOrFail($id);

        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'surname' => 'nullable|string|max:255',
            'origin' => 'nullable|string|max:255',
            'lore' => 'nullable|string',
            'image' => 'nullable|string|max:255',
            'icon_image' => 'nullable',
            'full_image' => 'nullable',

            'level' => 'sometimes|integer|min:1',
            'exp' => 'sometimes|integer|min:0',

            'pod' => 'sometimes|integer|min:0',
            'des' => 'sometimes|integer|min:0',
            'res' => 'sometimes|integer|min:0',
            'int' => 'sometimes|integer|min:0',
            'det' => 'sometimes|integer|min:0',
            'pre' => 'sometimes|integer|min:0',
            'hp_current' => 'sometimes|integer|min:0',
            'effect' => 'nullable|string',

            'skills' => 'nullable|array|max:6',
            'skills.*' => 'integer|exists:skills,id',
        ]);

        if ($request->hasFile('icon_image')) {
            $data['icon_image'] = $request->file('icon_image')->store('characters/icons', 'public');
        }

        if ($request->hasFile('full_image')) {
            $data['full_image'] = $request->file('full_image')->store('characters/full', 'public');
        }

        if (!empty($data['full_image'])) {
            $data['image'] = $data['full_image'];
        }

        $attributeKeys = ['pod', 'des', 'res', 'int', 'det', 'pre'];
        foreach ($attributeKeys as $attributeKey) {
            if (array_key_exists($attributeKey, $data)) {
                $data[$attributeKey] = max((int) $data[$attributeKey], (int) $character->{$attributeKey});
            }
        }

        $skillIds = collect($data['skills'] ?? [])
            ->unique()
            ->take(6)
            ->values()
            ->all();

        $shouldSyncSkills = $request->has('skills');
        unset($data['skills']);

        $requestedHpCurrent = $data['hp_current'] ?? null;
        $wasFullHp = $character->hp_current == $character->hp_max;

        if (array_key_exists('exp', $data)) {
            $currentLevel = (int) ($data['level'] ?? $character->level);
            $currentExp = (int) $data['exp'];

            while ($currentExp >= 1000) {
                $currentExp -= 1000;
                $currentLevel++;
            }

            $data['exp'] = $currentExp;
            $data['level'] = $currentLevel;
        }

        $character->update($data);

        $character->hp_max = (int) floor(($character->res * 1.5) + round(($character->pod *0.5)) + 6);
        if ($requestedHpCurrent !== null) {
            $character->hp_current = min((int) $requestedHpCurrent, $character->hp_max);
        } elseif ($wasFullHp) {
            $character->hp_current = $character->hp_max;
        }

        $character->pa_max = max(1, 4 + floor($character->int * 0.6) + floor($character->des * 0.2));
        $character->pr_max = max(1, 1 + floor($character->des * 0.25) + floor($character->det * 0.1));

        $character->save();

        if ($shouldSyncSkills) {
            $syncPayload = collect($skillIds)->mapWithKeys(function ($skillId) {
                return [$skillId => ['unlocked' => true, 'equipped' => true]];
            })->all();

            $character->skills()->sync($syncPayload);
        }

        return response()->json([
            'message' => 'personagem atualizado com sucesso',
            'character' => $character->load(['marca', 'campaign', 'skills']),
        ]);
    }

    public function playerCharacters(User $user)
    {
        return response()->json($this->charactersForUser($user));
    }

    public function byUser(User $user)
    {
        return response()->json($this->charactersForUser($user));
    }

    private function charactersForUser(User $user)
    {
        return $user->characters()
            ->with(['campaign', 'marca'])
            ->latest()
            ->get();
    }

    public function destroy(string $id)
    {
        $character = Character::findOrFail($id);
        $character->delete();

        return response()->json(['message' => 'personagem apagado com sucesso']);
    }
}
