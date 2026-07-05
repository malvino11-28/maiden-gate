<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    protected $fillable = [
        'master_id',
        'current_location_id',
        'name',
        'description',
        'image',
        'recommended_level',
        'players',
        'status',
        'notes'
    ];

    public function master() 
    {
        return $this->belongsTo(User::class, 'master_id');
    }

    public function characters() 
    {
        return $this->hasMany(Character::class);
    }

    public function users() 
    {
        return $this->belongsToMany(User::class, 'campaign_user')
            ->withPivot('role')
            ->withTimestamps();
    }
    
    public function locations()
    {
        return $this->hasMany(Locations::class);
    }

    public function npcs()
    {
        return $this->hasMany(Npcs::class);
    }

    public function items()
    {
        return $this->hasMany(Items::class);
    }

    public function bestiary()
    {
        return $this->hasMany(Bestiary::class);
    }

    public function loreEvents()
    {
        return $this->hasMany(LoreEvents::class);
    }

    public function sessions()
    {
        return $this->hasMany(CampaignSession::class);
}
}