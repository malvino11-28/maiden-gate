<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Character extends Model
{
    protected $fillable = [
        'user_id',
        'campaign_id',
        'marca_id',

        'name',
        'surname',
        'origin',
        'lore',
        'image',

        'level',
        'exp',

        'pod',
        'des',
        'res',
        'int',
        'det',
        'pre',

        'hp_current',
        'hp_max',

        'effect',

        'pa_max',
        'pr_max'
    ];

    public function user() 
    {
        return $this->belongsTo(User::class);
    }

    public function campaign() 
    {
        return $this->belongsTo(Campaign::class);
    }

    public function marca() 
    {
        return $this->belongsTo(Marcas::class, 'marca_id');
    }

    public function skills() {
    return $this->belongsToMany(Skills::class, 'character_skills')
                ->withPivot('unlocked', 'equipped')
                ->withTimestamps();
}
}