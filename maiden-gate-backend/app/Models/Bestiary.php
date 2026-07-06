<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bestiary extends Model
{
    protected $table = 'bestiary';

    protected $fillable = [
        'campaign_id',

        'image',
        'name',
        'type',
        'threat',
        'description',
        'skills',
        'stats',
    ];

    protected $casts = [
        'skills' => 'array',
        'stats' => 'array',
    ];

    public function campaign()
{
    return $this->belongsTo(Campaign::class);
}
}