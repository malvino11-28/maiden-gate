<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CampaignUser extends Model
{
    protected $fillable = [
    'campaign_id',
    'user_id',

    'role',
    ''
    ];

    public function campaign() {
        return $this->belongsTo(Campaign::class);
    }
}
