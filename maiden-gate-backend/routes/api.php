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

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::apiResource('campaigns', CampaignController::class);
Route::apiResource('characters', CharacterController::class);
Route::apiResource('items', ItemsController::class);
Route::apiResource('locations', LocationsController::class);
Route::apiResource('marcas', MarcasController::class);
Route::apiResource('skills', SkillsController::class);
Route::apiResource('bestiary', BestiaryController::class)->except(['index']);
Route::apiResource('npcs', NpcsController::class)->except(['index']);
Route::apiResource('lore-events', LoreEventsController::class)->except(['index']);
Route::apiResource('inventory', InventoryController::class)->except(['index']);

Route::get('/campaigns/{campaign}/npcs', [NpcsController::class, 'index']);
Route::get('/campaigns/{campaign}/lore-events', [LoreEventsController::class, 'index']);
Route::get('/characters/{character}/inventory', [InventoryController::class, 'index']);
