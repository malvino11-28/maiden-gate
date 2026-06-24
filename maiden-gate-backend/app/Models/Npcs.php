<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Npcs extends Model
{
    protected $fillable = [
    'campaign_id',
    'marca_id',
    'name',
    'description',
    'skills',
    'stats',
    ];

    protected $casts = [
    'skills' => 'array',
    'stats' => 'array',
    ];

    public function campaign() {
        return $this->belongsTo(Campaign::class);
    }

    public function marca() {
        return $this->belongsTo(Marcas::class);
    }
}

$table->foreignId("campaign_id")->nullable()->constrained("campaigns")->nullOnDelete();
            $table->foreignId("marca_id")->nullable()->constrained("marcas")->nullOnDelete();
            $table->string("name");
            $table->text("description");
            $table->jsonb("skills")->nullable();
            $table->jsonb("stats")->nullable();
            $table->timestamps();