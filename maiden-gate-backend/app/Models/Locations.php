<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Locations extends Model
{
    protected $fillable = [
    'campaign_id',

    'image',
    'name',
    'type',
    'description',
    'region'
    ];

    public function campaign() {
        return $this->belongsTo(Campaign::class);
    }
}
