<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    protected $fillable = [
    'master_id',

    'name',
    'description'
    ];

    public function master() {
        return $this->belongsTo(User::class, 'master_id');
    }

    public function characters() {
        return $this->hasMany(Character::class);
    }
}
