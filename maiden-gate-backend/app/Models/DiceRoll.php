<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DiceRoll extends Model
{
    protected $fillable = [
        'campaign_id',
        'user_id',
        'character_id',
        'author_name',
        'author_type',
        'dice',
        'quantity',
        'modifier',
        'results',
        'total',
        'critical',
        'failure',
    ];

    protected $casts = [
        'dice' => 'integer',
        'quantity' => 'integer',
        'modifier' => 'integer',
        'results' => 'array',
        'total' => 'integer',
        'critical' => 'boolean',
        'failure' => 'boolean',
    ];

    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function character()
    {
        return $this->belongsTo(Character::class);
    }
}
