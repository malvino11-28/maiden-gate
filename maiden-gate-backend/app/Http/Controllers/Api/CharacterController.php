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
            'campaign_id' => 'nullable|exists:campaign_id',
            'marca_id' => 'required|exists:marca,id',

            'name' => 'required|string|max:255',
            'lore' => 'nullable|string',

            'pod' => 'required|integer|min:0',
            'des' => 'required|integer|min:0',
            'res' => 'required|integer|min:0',
            'intelec' => 'required|integer|min:0',
            'det' => 'required|integer|min:0',
            'pre' => 'required|integer|min:0',
        ]);

        // $data['user_id'] = auth()->id(); a ser implementado
        $data['level'] = 1;
        $data['exp'] = 0;
        $data['hp_max'] = (int) floor($data['res'] * 1.5);
        $data['hp_current'] = $data['hp_max'];
        // $data['effect'] vem como null
        $data['pt'] = $data['des'] * ($data['intelec'] - 6); // pontos de energia
        $data['pr'] = $data['des'] * ($data['det'] - 12); // pontos de reacao

        $character = Character::create($data);

        // a ser imple manual do servidor
        // $user_id
        // level
        // exp
        // hp_max
        // hp_current
        // effect
        // pt
        // pr

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
            'lore' => 'sometimes|string',

            'pod' => 'sometimes|integer|min:0',
            'des' => 'sometimes|integer|min:0',
            'res' => 'sometimes|integer|min:0',
            'intelec' => 'sometimes|integer|min:0',
            'det' => 'sometimes|integer|min:0',
            'pre' => 'sometimes|integer|min:0',
        ]);

        $character->update($data);

        $character->hp_max = (int) floor($character->res * 1.5);
        $character->pt = $character->des * ($character->intelec - 6);
        $character->pr = $character->des * ($character->det - 12);

        $character->save();

        return response()->json(['message' => 'personagem atualizado com sucesso', 'character' => $character]);
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
