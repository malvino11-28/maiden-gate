<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bestiary extends Model
{
    protected $table = 'bestiary';

    protected $fillable = [
        'campaign_id',
    'visible_to_players',

        'image',
        'name',
        'type',
        'threat',
        'description',
        'skills',
        'stats',
    ];

    protected $casts = [
        'visible_to_players' => 'boolean',
        'skills' => 'array',
        'stats' => 'array',
    ];

    public function campaign()
{
    return $this->belongsTo(Campaign::class);
}
}