<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Marcas extends Model
{
    protected $fillable = [
    'name',
    'description',
    ];
    // $table->id();
    //         $table->enum("name", ["Manifesto", "Oculto", "Respiração", "Entoadora", "Maso"])->unique();
    //         $table->text("description");
    //         $table->timestamps();
    public function characters() {
        return $this->hasMany(Character::class);
    }

    public function skills() {
    return $this->hasMany(Skills::class, 'marca_id');
}
}
