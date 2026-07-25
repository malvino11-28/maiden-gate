<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BestiaryController;
use App\Http\Controllers\Api\CampaignController;
use App\Http\Controllers\Api\CampaignCollectionController;
use App\Http\Controllers\Api\CampaignUserController;
use App\Http\Controllers\Api\CharacterController;
use App\Http\Controllers\Api\CharacterSkillController;
use App\Http\Controllers\Api\DiceRollController;
use App\Http\Controllers\Api\CampaignSessionController;
use App\Http\Controllers\Api\InventoryController;
use App\Http\Controllers\Api\ItemsController;
use App\Http\Controllers\Api\LocationsController;
use App\Http\Controllers\Api\LoreEventsController;
use App\Http\Controllers\Api\MarcasController;
use App\Http\Controllers\Api\NpcsController;
use App\Http\Controllers\Api\SkillsController;

// endpoints disponíveis
// a grande maioria é Route Model Biding, ou seja, puxa um registro do db baseado no ID passado na URL

/*
|--------------------------------------------------------------------------
| Auth
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']); 
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Dashboard 
|--------------------------------------------------------------------------
*/

/* Master*/

Route::get('/users/{user}/master-campaigns', [CampaignController::class, 'masterCampaigns']); 
Route::get('/users/{user}/player-campaigns', [CampaignController::class, 'playerCampaigns']);
Route::get('/users/{user}/characters', [CharacterController::class, 'byUser']);

Route::get('/campaigns/available', [CampaignController::class, 'available']);
Route::get('/campaigns/{campaign}/master-view', [CampaignController::class, 'masterView']);
Route::get('/campaigns/{campaign}/player-view', [CampaignController::class, 'playerView']);

Route::put('/campaigns/{campaign}/data', [CampaignController::class, 'update']);
Route::put('/campaigns/{campaign}/notes', [CampaignController::class, 'updateNotes']);
Route::put('/campaigns/{campaign}/current-location', [CampaignController::class, 'updateCurrentLocation']);
Route::patch('/campaign-elements/{type}/{id}/visibility', [CampaignController::class, 'updateElementVisibility']);
Route::patch('/campaign-elements/{type}/{id}/collection', [CampaignController::class, 'updateElementCollection']);
Route::post('/campaign-elements/transfer', [CampaignController::class, 'transferElement']);

/* Player */

/*
|--------------------------------------------------------------------------
| Campaign sessions
|--------------------------------------------------------------------------
*/

Route::get('/campaigns/{campaign}/sessions', [CampaignSessionController::class, 'index']);
Route::post('/campaigns/{campaign}/sessions', [CampaignSessionController::class, 'store']);
Route::patch('/campaign-sessions/{campaignSession}/status', [CampaignSessionController::class, 'updateStatus']);
Route::put('/campaign-sessions/{campaignSession}', [CampaignSessionController::class, 'update']);
Route::delete('/campaign-sessions/{campaignSession}', [CampaignSessionController::class, 'destroy']);

/*
|--------------------------------------------------------------------------
| Campaign collections
|--------------------------------------------------------------------------
*/

Route::get('/campaigns/{campaign}/collections', [CampaignCollectionController::class, 'index']);
Route::post('/campaigns/{campaign}/collections', [CampaignCollectionController::class, 'store']);
Route::put('/campaign-collections/{campaignCollection}', [CampaignCollectionController::class, 'update']);
Route::patch('/campaign-collections/{campaignCollection}', [CampaignCollectionController::class, 'update']);
Route::delete('/campaign-collections/{campaignCollection}', [CampaignCollectionController::class, 'destroy']);

/*
|--------------------------------------------------------------------------
| Campaign elements
|--------------------------------------------------------------------------
*/

Route::get('/campaigns/{campaign}/locations', [LocationsController::class, 'index']); 
Route::post('/campaigns/{campaign}/locations', [LocationsController::class, 'store']); 

Route::get('/campaigns/{campaign}/npcs', [NpcsController::class, 'index']);
Route::post('/campaigns/{campaign}/npcs', [NpcsController::class, 'store']);

Route::get('/campaigns/{campaign}/items', [ItemsController::class, 'index']);
Route::post('/campaigns/{campaign}/items', [ItemsController::class, 'store']);

Route::get('/campaigns/{campaign}/bestiary', [BestiaryController::class, 'index']);
Route::post('/campaigns/{campaign}/bestiary', [BestiaryController::class, 'store']);

Route::get('/campaigns/{campaign}/lore-events', [LoreEventsController::class, 'index']);
Route::post('/campaigns/{campaign}/lore-events', [LoreEventsController::class, 'store']);

/*
|--------------------------------------------------------------------------
| Shared dice rolls
|--------------------------------------------------------------------------
*/

Route::get('/campaigns/{campaign}/dice-rolls', [DiceRollController::class, 'index']);
Route::post('/campaigns/{campaign}/dice-rolls', [DiceRollController::class, 'store']);
Route::delete('/campaigns/{campaign}/dice-rolls', [DiceRollController::class, 'destroy']);

/*
|--------------------------------------------------------------------------
| Inventory
|--------------------------------------------------------------------------
*/

Route::get('/characters/{character}/inventory', [InventoryController::class, 'index']);
Route::post('/characters/{character}/inventory', [InventoryController::class, 'store']);

Route::put('/inventory/{inventory}', [InventoryController::class, 'update']);
Route::delete('/inventory/{inventory}', [InventoryController::class, 'destroy']);

/*
|--------------------------------------------------------------------------
| Character skills
|--------------------------------------------------------------------------
*/

Route::get('/characters/{character}/skills', [CharacterSkillController::class, 'index']);
Route::post('/characters/{character}/skills', [CharacterSkillController::class, 'store']);

Route::patch('/characters/{character}/skills/{skill}', [CharacterSkillController::class, 'update']);
Route::delete('/characters/{character}/skills/{skill}', [CharacterSkillController::class, 'destroy']);

/*
|--------------------------------------------------------------------------
| Basic resources
|--------------------------------------------------------------------------
*/

// com o apiResource o código já cria as ações básicas sem a necessidade de escrever várias rotas 

Route::apiResource('/campaigns', CampaignController::class);
Route::apiResource('/campaign-users', CampaignUserController::class)->except(['update']);
Route::apiResource('/characters', CharacterController::class);
Route::apiResource('/marcas', MarcasController::class);
Route::apiResource('/skills', SkillsController::class);

Route::apiResource('/locations', LocationsController::class)->except(['index', 'store']);
Route::apiResource('/npcs', NpcsController::class)->except(['index', 'store']);
Route::apiResource('/items', ItemsController::class)->except(['index', 'store']);
Route::apiResource('/bestiary', BestiaryController::class)->except(['index', 'store']);
Route::apiResource('/lore-events', LoreEventsController::class)->except(['index', 'store']);

/*
|--------------------------------------------------------------------------
| Invitation System
|--------------------------------------------------------------------------
*/

Route::post('/campaigns/{campaign}/join-request', [CampaignUserController::class, 'requestJoin']);

Route::get('/users/{user}/campaign-requests', [CampaignUserController::class, 'pendingForMaster']);

Route::patch('/campaign-requests/{campaignUser}/accept', [CampaignUserController::class, 'accept']);
Route::patch('/campaign-requests/{campaignUser}/reject', [CampaignUserController::class, 'reject']);