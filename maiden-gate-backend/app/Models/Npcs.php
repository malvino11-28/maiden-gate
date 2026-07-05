<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Npcs extends Model
{

    protected $fillable = [
        'campaign_id',
        'marca_id',
        'name',
        'race',
        'occupation',
        'personality',
        'secret',
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

    public function marca() 
    {
        return $this->belongsTo(Marcas::class, 'marca_id');
    }
}