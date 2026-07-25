<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Campaign;
use App\Models\CampaignCollection;
use App\Models\Locations;
use App\Models\Npcs;
use App\Models\Items;
use App\Models\Bestiary;
use App\Models\LoreEvents;
use App\Models\Skills;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

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
        /* 
            essa bagunça ta funcionando assim:
            1. Recebe FormData do React | 2. Lê o JSON armazenado no payload | 3. Mistura o JSON no request
            4. Valida campanha e elementos | 5. Abre uma transação | 6. Cria a campanha | 7. Cria as coleções
            8. Cria localizações/npcs/monstros/itens/eventos/habilidades | 9. salva imagens | 10. devolve tudo em JSON
        */
        $this->mergeJsonPayload($request); // descompacta o conteúdo recebido do react

        // aqui na validação o laravel verifica se o conteúdo recebido respeita as diretrizes
        $data = $request->validate([
            'master_id' => 'required|exists:users,id',

            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string|max:255',
            'recommended_level' => 'required|in:Iniciante,Intermediário,Avançado',
            'players' => 'nullable|string|max:255',
            'status' => 'nullable|in:ativa,pausada,encerrada',
            'notes' => 'nullable|string',

            'collections' => 'sometimes|array',
            'collections.*.client_id' => 'nullable|string|max:255',
            'collections.*.name' => 'required|string|max:255',
            'collections.*.description' => 'nullable|string',
            'collections.*.color' => 'nullable|string|max:255',
            'collections.*.sort_order' => 'nullable|integer|min:0',
            'collections.*.visible_to_players' => 'nullable|boolean',

            'locations' => 'sometimes|array',
            'locations.*.collection_id' => 'nullable|integer',
            'locations.*.collection_client_id' => 'nullable|string|max:255',
            'locations.*.name' => 'required|string|max:255',
            'locations.*.type' => 'nullable|string|max:255',
            'locations.*.region' => 'nullable|string|max:255',
            'locations.*.image' => 'nullable',
            'locations.*.description' => 'nullable|string',

            'npcs' => 'sometimes|array',
            'npcs.*.collection_id' => 'nullable|integer',
            'npcs.*.collection_client_id' => 'nullable|string|max:255',
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
            'monsters.*.collection_id' => 'nullable|integer',
            'monsters.*.collection_client_id' => 'nullable|string|max:255',
            'monsters.*.name' => 'required|string|max:255',
            'monsters.*.type' => 'nullable|string|max:255',
            'monsters.*.threat' => 'nullable|string|max:255',
            'monsters.*.description' => 'nullable|string',
            'monsters.*.skills' => 'nullable',
            'monsters.*.stats' => 'nullable|array',

            'items' => 'sometimes|array',
            'items.*.collection_id' => 'nullable|integer',
            'items.*.collection_client_id' => 'nullable|string|max:255',
            'items.*.name' => 'required|string|max:255',
            'items.*.type' => 'nullable|string|max:255',
            'items.*.description' => 'nullable|string',

            'events' => 'sometimes|array',
            'events.*.collection_id' => 'nullable|integer',
            'events.*.collection_client_id' => 'nullable|string|max:255',
            'events.*.title' => 'required|string|max:255',
            'events.*.chronology' => 'nullable|string|max:255',
            'events.*.date' => 'nullable|string|max:255',
            'events.*.description' => 'nullable|string',

            'skills' => 'sometimes|array',
            'skills.*.collection_id' => 'nullable|integer',
            'skills.*.collection_client_id' => 'nullable|string|max:255',
            'skills.*.marca_id' => 'nullable|exists:marcas,id',
            'skills.*.name' => 'required|string|max:255',
            'skills.*.description' => 'nullable|string',
            'skills.*.type' => 'required|in:ativa,passiva,penalidade,campanha',
            'skills.*.branch' => 'nullable|in:ofensivo,suporte,destreza,passivas,penalidade,campanha',
            'skills.*.unlock_level' => 'nullable|integer|min:1',
            'skills.*.resource_cost' => 'nullable|integer|min:0',
            'skills.*.range' => 'nullable|string|max:255',

            'image' => 'nullable',
            'npcs.*.image' => 'nullable',
            'monsters.*.image' => 'nullable',
        ]);

        // function () é apenas uma ponte para que as variáveis $data e $request possam ser lidas
        $campaign = DB::transaction(function () use ($data, $request) { // abrindo transação, garantindo rollback em caso de erro
            $campaign = Campaign::create([ // o model campaing insere os dados na tabela
                'master_id' => $data['master_id'],
                'name' => $data['name'],
                'description' => $data['description'] ?? null,
                'image' => $data['image'] ?? null,
                'recommended_level' => $data['recommended_level'],
                'players' => $data['players'] ?? null,
                'status' => $data['status'] ?? 'ativa',
                'notes' => $data['notes'] ?? null,
            ]);

            $collectionMap = []; // isso é básicamente um dicionário de tradução vazio
            // quando o user cria as coleções, IDs temporários são criados
            // então, a função dela é criar uma tabela de conversão, onde assim que de fato as coleções são salvas no db, elas se transformam no ID correto

            foreach ($data['collections'] ?? [] as $index => $collection) {
                $createdCollection = $campaign->collections()->create([
                    'name' => $collection['name'],
                    'description' => $collection['description'] ?? null,
                    'color' => $collection['color'] ?? null,
                    'sort_order' => $collection['sort_order'] ?? $index,
                    'visible_to_players' => $collection['visible_to_players'] ?? false,
                ]);

                if (!empty($collection['client_id'])) {
                    $collectionMap[$collection['client_id']] = $createdCollection->id;
                }
            }

            foreach ($data['locations'] ?? [] as $index => $location) {
                $image = $location['image'] ?? null;

                if ($request->hasFile("locations.$index.image")) { // se tiver um arquivo 
                    $image = $request->file("locations.$index.image")->store('locations', 'public'); // guarda apenas o caminho
                    // o arquivo físico fica salvo no armazenamento público
                }

                // aqui o laravel preenche automaticamente o "campaign_id" de "locations" criando dessa forma
                // isso vale para as outras tabelas também

                $campaign->locations()->create([
                    'collection_id' => $this->resolveCollectionId($location, $collectionMap, $campaign->id),
                    'image' => $image,
                    'name' => $location['name'],
                    'type' => $location['type'] ?? '',
                    'region' => $location['region'] ?? null,
                    'description' => $location['description'] ?? null,
                    'visible_to_players' => $location['visible_to_players'] ?? false,
                ]);
            }

            foreach ($data['npcs'] ?? [] as $index => $npc) {
                $image = $npc['image'] ?? null;

                if ($request->hasFile("npcs.$index.image")) {
                    $image = $request->file("npcs.$index.image")->store('npcs', 'public');
                }

                $campaign->npcs()->create([
                    'collection_id' => $this->resolveCollectionId($npc, $collectionMap, $campaign->id),
                    'marca_id' => $npc['marca_id'] ?? null,
                    'name' => $npc['name'],
                    'race' => $npc['race'] ?? null,
                    'occupation' => $npc['occupation'] ?? null,
                    'personality' => $npc['personality'] ?? null,
                    'secret' => $npc['secret'] ?? null,
                    'description' => $npc['description'] ?? null,
                    'skills' => $npc['skills'] ?? null,
                    'stats' => $npc['stats'] ?? null,
                    'image' => $image,
                    'visible_to_players' => $npc['visible_to_players'] ?? false,
                ]);
            }

            foreach ($data['monsters'] ?? [] as $index => $monster) {
                $image = $monster['image'] ?? null;

                if ($request->hasFile("monsters.$index.image")) {
                    $image = $request->file("monsters.$index.image")->store('bestiary', 'public');
                }

                $campaign->bestiary()->create([
                    'collection_id' => $this->resolveCollectionId($monster, $collectionMap, $campaign->id),
                    'name' => $monster['name'],
                    'type' => $monster['type'] ?? null,
                    'threat' => $monster['threat'] ?? null,
                    'description' => $monster['description'] ?? null,
                    'skills' => is_array($monster['skills'] ?? null)
                        ? $monster['skills']
                        : ['summary' => $monster['skills'] ?? null],
                    'stats' => $monster['stats'] ?? null,
                    'image' => $image,
                    'visible_to_players' => $monster['visible_to_players'] ?? false,
                ]);
            }

            foreach ($data['items'] ?? [] as $item) {
                $campaign->items()->create([
                    'collection_id' => $this->resolveCollectionId($item, $collectionMap, $campaign->id),
                    'name' => $item['name'],
                    'type' => $item['type'] ?? null,
                    'description' => $item['description'] ?? null,
                    'visible_to_players' => $item['visible_to_players'] ?? false,
                ]);
            }

            foreach ($data['events'] ?? [] as $event) {
                $campaign->loreEvents()->create([
                    'collection_id' => $this->resolveCollectionId($event, $collectionMap, $campaign->id),
                    'title' => $event['title'],
                    'chronology' => $event['chronology'] ?? null,
                    'event_date' => $event['date'] ?? null,
                    'description' => $event['description'] ?? null,
                    'visible_to_players' => $event['visible_to_players'] ?? false,
                ]);
            }

            foreach ($data['skills'] ?? [] as $skill) {
                $campaign->skills()->create([
                    'collection_id' => $this->resolveCollectionId($skill, $collectionMap, $campaign->id),
                    'marca_id' => $skill['marca_id'] ?? null,
                    'name' => $skill['name'],
                    'description' => $skill['description'] ?? null,
                    'type' => $skill['type'] ?? 'campanha',
                    'branch' => $skill['branch'] ?? 'campanha',
                    'unlock_level' => $skill['unlock_level'] ?? 1,
                    'resource_cost' => $skill['resource_cost'] ?? 0,
                    'range' => $skill['range'] ?? null,
                ]);
            }

            return $campaign;
        });

        return response()->json(
            $campaign->load([
                'collections',
                'locations.collection',
                'npcs.collection',
                'items.collection',
                'bestiary.collection',
                'loreEvents.collection',
                'sessions',
                'currentLocation',
                'skills.collection',
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
            ->with([
                'master',
                'sessions' => function ($query) {
                    $query->orderBy('date')->orderBy('time');
                },
                'characters' => function ($query) use ($user) {
                    $query
                        ->where('user_id', $user->id)
                        ->with('marca');
                },
            ])
            ->withCount('acceptedUsers')
            ->latest('campaigns.created_at')
            ->get();

        return response()->json($campaigns);
    }

    public function available(Request $request)
    {
        $query = Campaign::where('status', 'ativa')
            ->with([
                'master',
                'sessions' => function ($query) {
                    $query->orderBy('date')->orderBy('time');
                },
            ])
            ->withCount('acceptedUsers')
            ->latest();

        if ($request->filled('user_id')) {
            $userId = (int) $request->user_id;

            $query
                ->where('master_id', '!=', $userId)
                ->whereDoesntHave('campaignUsers', function ($query) use ($userId) {
                    $query
                        ->where('user_id', $userId)
                        ->whereIn('status', ['pending', 'accepted']);
                });
        }

        return response()->json($query->get());
    }

    public function masterView(Campaign $campaign) // aqui é a função que determina a visão do mestre na página de campanha
    {
        $campaign->load([
            'master',
            'characters.user',
            'characters.marca',
            'users',
            'collections',
            'locations.collection',
            'npcs.collection',
            'items.collection',
            'bestiary.collection',
            'loreEvents.collection',
            'sessions',
            'currentLocation',
            'skills.collection',
        ]);

        return response()->json($campaign);
    }

    public function playerView(Request $request, Campaign $campaign) // o mesmo para o jogador, porém com filtros
    {
        $visibleOnly = function ($query) {
            $query->where('visible_to_players', true)->with('collection')->latest();
        };

        $campaign->load([
            'master',
            'acceptedUsers',
            'locations' => $visibleOnly,
            'npcs' => function ($query) {
                $query->where('visible_to_players', true)->with(['marca', 'collection'])->latest();
            },
            'items' => $visibleOnly,
            'bestiary' => $visibleOnly,
            'loreEvents' => $visibleOnly,
            'sessions' => function ($query) {
                $query->orderBy('date')->orderBy('time');
            },
            'currentLocation',
        ]);

        if ($campaign->currentLocation && !$campaign->currentLocation->visible_to_players) {
            $campaign->setRelation('currentLocation', null);
        }

        $campaign->load([
            'characters' => function ($query) use ($request) {
                if ($request->filled('character_id')) {
                    $query->where('id', $request->character_id);
                }

                $query->with([
                    'user',
                    'marca',
                    'skills',
                    'inventory.item',
                ]);
            },
        ]);

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

    public function updateElementVisibility(Request $request, string $type, string $id)
    {
        $data = $request->validate([
            'visible_to_players' => 'required|boolean',
        ]);

        $modelClass = $this->getElementModelClass($type);
        $element = $modelClass::findOrFail($id);

        $element->update([
            'visible_to_players' => $data['visible_to_players'],
        ]);

        return response()->json($element);
    }

    public function updateElementCollection(Request $request, string $type, string $id)
    {
        $data = $request->validate([
            'collection_id' => 'nullable|integer',
        ]);

        $modelClass = $this->getElementModelClass($type);
        $element = $modelClass::findOrFail($id);

        $collectionId = $data['collection_id'] ?? null;

        if ($collectionId) {
            CampaignCollection::where('id', $collectionId)
                ->where('campaign_id', $element->campaign_id)
                ->firstOrFail();
        }

        $element->update([
            'collection_id' => $collectionId,
        ]);

        return response()->json($element->fresh('collection'));
    }

    public function transferElement(Request $request)
    {
        $data = $request->validate([
            'origin_campaign_id' => 'required|exists:campaigns,id',
            'destination_campaign_id' => 'required|different:origin_campaign_id|exists:campaigns,id',
            'element_id' => 'required|integer',
            'element_type' => 'required|string',
        ]);

        $modelClass = $this->getElementModelClass($data['element_type']);

        $element = $modelClass::where('id', $data['element_id'])
            ->where('campaign_id', $data['origin_campaign_id'])
            ->firstOrFail();

        $copy = $element->replicate();
        $copy->campaign_id = $data['destination_campaign_id'];

        if (array_key_exists('visible_to_players', $copy->getAttributes())) {
            $copy->visible_to_players = false;
        }

        if (array_key_exists('collection_id', $copy->getAttributes())) {
            $copy->collection_id = null;
        }

        $copy->save();

        return response()->json($copy->fresh(), 201);
    }

    private function mergeJsonPayload(Request $request): void
    {
        if (!$request->filled('payload')) {
            return; 
        }

        // transformando a linha de texto recebida do React em um array organizado
        $payload = json_decode((string) $request->input('payload'), true);

        if (!is_array($payload) || json_last_error() !== JSON_ERROR_NONE) { // verifica se o que foi transformado de fato virou um array
        // e se também houve algum erro ao ler o texto

            throw ValidationException::withMessages([ // então o laravel para a leitura
                'payload' => 'Os dados da campanha estão em um formato inválido.',
            ]);
        }

        $request->merge($payload); // descompacta o conteúdo do request em array 
    }

    private function resolveCollectionId(array $element, array $collectionMap, int $campaignId): ?int
    {
        $collectionId = $element['collection_id'] ?? null;

        if ($collectionId) {
            return CampaignCollection::where('id', $collectionId)
                ->where('campaign_id', $campaignId)
                ->value('id');
        }

        $clientId = $element['collection_client_id'] ?? $element['collectionId'] ?? null;

        if ($clientId && isset($collectionMap[$clientId])) {
            return $collectionMap[$clientId];
        }

        return null;
    }

    private function getElementModelClass(string $type): string
    {
        return match ($type) {
            'location', 'localizacao', 'Localização', 'locations' => Locations::class,
            'npc', 'NPC', 'npcs' => Npcs::class,
            'item', 'Item', 'items' => Items::class,
            'monster', 'monstro', 'Monstro', 'bestiary' => Bestiary::class,
            'event', 'evento', 'Evento', 'lore-event', 'lore_events' => LoreEvents::class,
            'skill', 'skills', 'habilidade' => Skills::class,
            default => abort(422, 'Tipo de elemento inválido.'),
        };
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