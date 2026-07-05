<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    protected $fillable = [
        'type',
        'name',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    public function characters() {
        return $this->hasMany(Character::class);
    }

    public function campaignsAsMaster() {
        return $this->hasMany(Campaign::class, 'master_id');
    }

    public function campaigns()
    {
        return $this->belongsToMany(Campaign::class, 'campaign_users')
            ->wherePivot('status', 'accepted')
            ->withPivot(['character_id', 'status', 'responded_at'])
            ->withTimestamps(); 
    }

    public function campaignRequests()
    {
        return $this->hasMany(CampaignUser::class);
    }
}