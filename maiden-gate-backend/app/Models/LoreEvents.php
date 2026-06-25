<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LoreEvents extends Model
{
    protected $fillable = [
    'campaign_id',

    'title',
    'description',
    'chronology',
    'event_date'
    ];

    public function campaign() {
        return $this->belongsTo(Campaign::class);
    }
}
