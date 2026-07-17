<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LoreEvents extends Model
{
    protected $fillable = [
    'campaign_id',
    'collection_id',
    'visible_to_players',

    'title',
    'description',
    'chronology',
    'event_date'
    ];

    protected $casts = [
        'visible_to_players' => 'boolean',
    ];

    public function campaign() {
        return $this->belongsTo(Campaign::class);
    }

    public function collection() {
        return $this->belongsTo(CampaignCollection::class, 'collection_id');
    }
}
