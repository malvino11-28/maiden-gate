<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Character;
use Illuminate\Http\Request;

class CharacterSkillController extends Controller
{
    /**
     * Lista todas as habilidades de um personagem específico.
     */
    public function index(string $characterId)
    {
        $character = Character::findOrFail($characterId);
        
        return response()->json($character->skills);
    }

    /**
     * Vincula uma habilidade ao personagem (ou atualiza se já existir).
     */
    public function store(Request $request, string $characterId)
    {
        $character = Character::findOrFail($characterId);

        $data = $request->validate([
            'skill_id' => 'required|integer|exists:skills,id',
            'unlocked' => 'nullable|boolean',
            'equipped' => 'nullable|boolean',
        ]);

        // syncWithoutDetaching impede duplicidade e respeita a constraint unique da sua migration
        $character->skills()->syncWithoutDetaching([
            $data['skill_id'] => [
                'unlocked' => $data['unlocked'] ?? false,
                'equipped' => $data['equipped'] ?? false,
            ]
        ]);

        return response()->json([
            'message' => 'Habilidade vinculada ao personagem com sucesso.',
            'character' => $character->load('skills')
        ]);
    }

    /**
     * Atualiza o estado de uma habilidade que o personagem já possui (ex: equipar/desequipar).
     */
    public function update(Request $request, string $characterId, string $skillId)
    {
        $character = Character::findOrFail($characterId);

        $data = $request->validate([
            'unlocked' => 'sometimes|required|boolean',
            'equipped' => 'sometimes|required|boolean',
        ]);

        // Atualiza os dados da tabela pivô
        $character->skills()->updateExistingPivot($skillId, $data);

        return response()->json([
            'message' => 'Estado da habilidade atualizado com sucesso.',
            'character' => $character->load('skills')
        ]);
    }

    /**
     * Remove a habilidade do personagem.
     */
    public function destroy(string $characterId, string $skillId)
    {
        $character = Character::findOrFail($characterId);
        
        $character->skills()->detach($skillId);

        return response()->json([
            'message' => 'Habilidade removida do personagem com sucesso.'
        ]);
    }
}