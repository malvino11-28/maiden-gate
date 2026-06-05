<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Npcs extends Model
{
    protected $fillable = [
    'campaign_id',
    'marca_id',

    'name',
    'description',
    'skills',
    'stats'
    ];

    public function campaign() {
        return $this->belongsTo(Campaign::class);
    }

    public function marca() {
        return $this->belongsTo(Marcas::class);
    }
}
