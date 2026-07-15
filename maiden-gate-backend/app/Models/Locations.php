<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Locations extends Model
{
    protected $fillable = [
    'campaign_id',
    'visible_to_players',

    'image',
    'name',
    'type',
    'description',
    'region'
    ];

    protected $casts = [
        'visible_to_players' => 'boolean',
    ];

    public function campaign() {
        return $this->belongsTo(Campaign::class);
    }
}
