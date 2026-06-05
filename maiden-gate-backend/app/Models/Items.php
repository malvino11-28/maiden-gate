<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Items extends Model
{
    
    protected $fillable = [
    'name',
    'description',
    'type'
    ];
    public function items() {
        return $this->hasMany(Items::class);
    }
}
