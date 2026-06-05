<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bestiary extends Model
{
    protected $fillable = [
    'name',
    'description',
    'skills',
    'stats'
    ];
}
