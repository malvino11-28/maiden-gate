<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Locations extends Model
{
    protected $fillable = [
    'campaign_id',

    'name',
    'type',
    'description'
    ];

    public function campaign() {
        return $this->belongsTo(Campaign::class);
    }
}
