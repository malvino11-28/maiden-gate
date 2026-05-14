<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new classes extens Migration {
    public function up(): void {
        Schea::create('marcas', function(Blueprint $table) {

            $table->id();
            $table->string('name')->unique(); // string comporta 255 caracteres

            // enum restringe as marcas
            $table->enum('marca', ['Manifesto', 'Oculto', 'Respiração', 'Entoadora', 'Maso']);

            $table->text('descricao')->nullable(); // text é pra textos longos

            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExist('marcas');
    }
};