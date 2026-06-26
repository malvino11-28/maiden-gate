<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skills extends Model
{
    protected $fillable = [
    'marca_id',

    'name',
    'desc',
    'categoria',
    'unlock_level',
    'resource_cost',
    'alcance'
    ];

    public function marca() {
        return $this->belongsTo(Marcas::class);
    }
}
