<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Items extends Model
{
    protected $fillable = [
    'campaign_id',
    'collection_id',
    'visible_to_players',
    'name',
    'description',
    'type',
    ];

    public function inventories() {
        return $this->hasMany(Inventory::class, 'item_id');
    }

    protected $casts = [
        'visible_to_players' => 'boolean',
    ];

    public function campaign()
{
    return $this->belongsTo(Campaign::class);
}

    public function collection()
{
    return $this->belongsTo(CampaignCollection::class, 'collection_id');
}
}