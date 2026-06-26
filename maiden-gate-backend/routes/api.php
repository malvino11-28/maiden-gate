<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BestiaryController;
use App\Http\Controllers\Api\CampaignController;
use App\Http\Controllers\Api\CampaignUserController;
use App\Http\Controllers\Api\CharacterController;
use App\Http\Controllers\Api\InventoryController;
use App\Http\Controllers\Api\ItemsController;
use App\Http\Controllers\Api\LocationsController;
use App\Http\Controllers\Api\LoreEventsController;
use App\Http\Controllers\Api\MarcaController;
use App\Http\Controllers\Api\MarcasController;
use App\Http\Controllers\Api\NpcsController;
use App\Http\Controllers\Api\SkillsController;
use App\Models\Inventory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('/teste', function () {
    return response()->json([
        'message' => 'API do Maiden-Gate funcionando!'
    ]);
});

Route::apiResource('register', AuthController::class);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
Route::apiResource('bestiary', BestiaryController::class);
Route::apiResource('campaign', CampaignController::class);
Route::apiResource('campaign_user', CampaignUserController::class);
Route::apiResource('characters', CharacterController::class);
Route::apiResource('inventory', InventoryController::class);
    Route::get('/characters/{characterId}/inventory', [InventoryController::class, 'index']);
Route::apiResource('items', ItemsController::class);
Route::apiResource('locations', LocationsController::class);
Route::apiResource('lore_events', LoreEventsController::class);
    Route::get('/campaign/{campaignId}/lore_events', [LoreEventsController::class, 'index']);
Route::apiResource('marcas', MarcasController::class);
Route::apiResource('npcs', NpcsController::class);
Route::apiResource('skills', SkillsController::class);
