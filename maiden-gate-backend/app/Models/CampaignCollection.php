<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CampaignCollection extends Model
{
    protected $fillable = [
        'campaign_id',
        'name',
        'description',
        'color',
        'sort_order',
        'visible_to_players',
    ];

    protected $casts = [
        'visible_to_players' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }

    public function locations()
    {
        return $this->hasMany(Locations::class, 'collection_id');
    }

    public function npcs()
    {
        return $this->hasMany(Npcs::class, 'collection_id');
    }

    public function items()
    {
        return $this->hasMany(Items::class, 'collection_id');
    }

    public function bestiary()
    {
        return $this->hasMany(Bestiary::class, 'collection_id');
    }

    public function loreEvents()
    {
        return $this->hasMany(LoreEvents::class, 'collection_id');
    }

    public function skills()
    {
        return $this->hasMany(Skills::class, 'collection_id');
    }
}
