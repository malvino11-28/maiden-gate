<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class CharacterSkill extends Pivot
{
    protected $table = 'character_skills';

    protected $fillable = [
        'character_id',
        'skill_id',
        'unlocked',
        'equipped',
    ];

    protected $casts = [
        'unlocked' => 'boolean',
        'equipped' => 'boolean',
    ];
}