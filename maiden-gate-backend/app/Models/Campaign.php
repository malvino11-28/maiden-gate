<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    protected $fillable = [
        'master_id',
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
}