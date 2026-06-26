<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CampaignUser extends Model
{
    protected $table = 'campaign_user';

    protected $fillable = [
    'campaign_id',
    'user_id',
    'role',
    ];

    public function campaign() {
        return $this->belongsTo(Campaign::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}