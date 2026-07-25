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
    ]; // indicando o que não deve aparecer no json

    protected function casts(): array // convertendo tipos
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
        return $this->belongsToMany(Campaign::class, 'campaign_user')
            ->wherePivot('status', 'accepted')
            ->withPivot(['character_id', 'status', 'responded_at'])
            ->withTimestamps(); 
    }

    public function campaignRequests()
    {
        return $this->hasMany(CampaignUser::class);
    }
}