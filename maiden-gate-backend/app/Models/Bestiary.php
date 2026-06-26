<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bestiary extends Model
{
    protected $table = 'bestiary';

    protected $fillable = [
        'name',
        'description',
        'skills',
        'stats',
    ];

    protected $casts = [
        'skills' => 'array',
        'stats' => 'array',
    ];
}