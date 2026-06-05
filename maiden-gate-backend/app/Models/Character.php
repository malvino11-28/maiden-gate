<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Character extends Model
{
    protected $fillable = [
    'user_id',
    'campanha_id',
    'marca_id',

    'name',
    'lore',
    'level',
    'exp',
    
    'pod',
    'des',
    'res',
    'intelec',
    'det',
    'pre',

    'hp_current',
    'hp_max',
    
    'effect',
    'pt',
    'pr'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function campaign() {
        return $this->belongsTo(Campaign::class);
    }

    public function marca() {
        return $this->belongsTo(Marcas::class);
    }
}
