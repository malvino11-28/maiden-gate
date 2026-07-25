<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// models representam as tabelas do db

class Campaign extends Model // transformando tabelas em classes para serem manipuladas
{
    protected $fillable = [ // $fillable indica os campos que podem ser preenchidos com 'create()' ou 'update()'
        'master_id',
        'current_location_id',
        'name',
        'description',
        'image',
        'recommended_level',
        'players',
        'status',
        'notes'
    ]; // sem estar aqui, o laravel não aceita o campo por atribuição em massa

    public function master() 
    {
        return $this->belongsTo(User::class, 'master_id'); // "a campanha" pertence a "um usuário (mestre_id)"
    }

    public function characters() 
    {
        return $this->hasMany(Character::class); // "uma campanha" tem muitos "personagens"
    }

    public function users() 
    {
        return $this->belongsToMany(User::class, 'campaign_user') // "uma campanha" tem muitos "usuários", e "um usuário" pode participar de "muitas campanhas"
            ->withPivot([ // criando a tabela pivô que cruza os dados, "user_id x está na campaign_id y"
                'role',
                'character_id',
                'status',
                'responded_at',
                'response_message',
            ]) // além de cruzar os dados, ela guarda informações extras sobre o vínculo
            // no código isso é usado com "pivot->role" por exemplo (com foreach para navegar)
            ->withTimestamps(); // criando a tabela pivô com o timestamp
    }
    
    public function collections()
    {
        return $this->hasMany(CampaignCollection::class);
    }

    public function locations()
    {
        return $this->hasMany(Locations::class);
    }

    public function currentLocation()
    {
        return $this->belongsTo(Locations::class, 'current_location_id');
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

    public function diceRolls()
    {
        return $this->hasMany(DiceRoll::class);
    }

    public function skills()
    {
        return $this->hasMany(Skills::class);
    }

    public function campaignUsers()
    {
        return $this->hasMany(CampaignUser::class);
    }

    public function joinRequests()
    {
        return $this->hasMany(CampaignUser::class)->where('status', 'pending');
    }

    public function acceptedUsers()
    {
        return $this->belongsToMany(User::class, 'campaign_user')
            ->wherePivot('status', 'accepted')
            ->withPivot(['character_id', 'status', 'responded_at'])
            ->withTimestamps();
    }
}