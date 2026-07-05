<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skills extends Model
{
    protected $fillable = [
        'marca_id',
        'campaign_id',
        'name',
        'description',
        'type',
        'branch',
        'image',
        'unlock_level',
        'resource_cost',
        'range'
    ];

    public function marca() 
    {
        return $this->belongsTo(Marcas::class, 'marca_id');
    }

    public function campaign() 
    {
        return $this->belongsTo(Campaign::class);
    }
}