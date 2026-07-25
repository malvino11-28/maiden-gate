<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Npcs extends Model
{

    protected $fillable = [
        'campaign_id',
        'collection_id',
    'visible_to_players',
        'marca_id',
        'image',
        'name',
        'race',
        'occupation',
        'personality',
        'secret',
        'description',
        'skills',
        'stats',
    ];

    protected $casts = [ // convertendo tipos
        'visible_to_players' => 'boolean',
        'skills' => 'array',
        'stats' => 'array',
    ];

    public function campaign() 
    {
        return $this->belongsTo(Campaign::class);
    }

    public function marca() 
    {
        return $this->belongsTo(Marcas::class, 'marca_id');
    }

    public function collection() 
    {
        return $this->belongsTo(CampaignCollection::class, 'collection_id');
    }
}