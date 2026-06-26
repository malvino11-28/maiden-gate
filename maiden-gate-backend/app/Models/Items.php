<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Items extends Model
{
    protected $fillable = [
    'name',
    'description',
    'type',
    ];

    public function inventories() {
        return $this->hasMany(Inventory::class, 'item_id');
    }
}