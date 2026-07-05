<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Items extends Model
{
    protected $fillable = [
    'campaign_id',
    'name',
    'description',
    'type',
    ];

    public function inventories() {
        return $this->hasMany(Inventory::class, 'item_id');
    }

    public function campaign()
{
    return $this->belongsTo(Campaign::class);
}
}