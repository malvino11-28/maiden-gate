<?php

namespace App\Http\Controllers\Api;

use App\Models\Character;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CharacterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Character::all());
    }

    /**
     * Store a newly created resource in storage.
     */
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

            'pod' => 'required|integer|min:0',
            'des' => 'required|integer|min:0',
            'res' => 'required|integer|min:0',
            'int' => 'required|integer|min:0',
            'det' => 'required|integer|min:0',
            'pre' => 'required|integer|min:0',
        ]);

        // $data['user_id'] = auth()->id(); a ser implementado
        $data['level'] = 1;
        $data['exp'] = 0;
        $data['hp_max'] = (int) floor($data['res'] * 1.5);
        $data['hp_current'] = $data['hp_max'];
        
        // Cálculos de PT e PR Máximos baseados nos atributos recebidos
        $calculo_pa = 4 + floor($data['int'] * 0.6) + floor($data['des'] * 0.2);
        $data['pa_max'] = max(1, $calculo_pa); 

        $calculo_pr = 1 + floor($data['des'] * 0.25) + floor($data['det'] * 0.1);
        $data['pr_max'] = max(1, $calculo_pr);

        $character = Character::create($data);

        return response()->json($character, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $character = Character::findOrFail($id);
        
        return response()->json($character);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $character = Character::findOrFail($id);
        
        $data = $request->validate([

            'name' => 'sometimes|string|max:255',
            'surname' => 'nullable|string|max:255',
            'origin' => 'nullable|string|max:255',
            'lore' => 'nullable|string',
            'image' => 'nullable|string|max:255',

            'level' => 'sometimes|integer|min:1',
            'exp' => 'sometimes|integer|min:0',

            'pod' => 'sometimes|integer|min:0',
            'des' => 'sometimes|integer|min:0',
            'res' => 'sometimes|integer|min:0',
            'int' => 'sometimes|integer|min:0',
            'det' => 'sometimes|integer|min:0',
            'pre' => 'sometimes|integer|min:0',
            'hp_current' => 'sometimes|integer|min:0',
            'effect' => 'nullable|string'
        ]);

        $character->update($data);

        // Recálculo de HP dinâmico pós-update
        if ($character->hp_current == $character->hp_max) {
            $character->hp_max = (int) floor($character->res * 1.5);
            $character->hp_current = $character->hp_max;
        } else {
            $character->hp_max = (int) floor($character->res * 1.5);
        }

        // Recálculo de PT Máximo e PR Máximo pós-update
        $calculo_pa = 4 + floor($character->int * 0.6) + floor($character->des * 0.2);
        $character->pa_max = max(1, $calculo_pa);

        $calculo_pr = 1 + floor($character->des * 0.25) + floor($character->det * 0.1);
        $character->pr_max = max(1, $calculo_pr);

        $character->save();

        return response()->json([
            'message' => 'personagem atualizado com sucesso', 
            'character' => $character
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $character = Character::findOrFail($id);
        $character->delete();

        return response()->json(['message' => 'personagem apagado com sucesso']);
    }
}