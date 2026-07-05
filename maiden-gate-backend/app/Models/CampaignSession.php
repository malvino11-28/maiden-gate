<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CampaignSession extends Model
{
    protected $fillable = [
        'campaign_id',
        'title',
        'date',
        'time',
        'description',
        'status'
    ];

    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }
}