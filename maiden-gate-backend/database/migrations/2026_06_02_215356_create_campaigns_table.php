<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// histórico da estrutura do banco

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void // cria/altera estrutura
    {
        // foreignId -> cria a coluna ('') com fk
        // constrained -> referencia a tabela ('')
        // onDelete -> ao pagar o referenciado, o registro também é deletado
        Schema::create('campaigns', function (Blueprint $table) {
            $table->id();
            $table->foreignId('master_id')->constrained("users")->onDelete("cascade");
            
            $table->string("name");
            $table->text("description")->nullable();
            $table->string("image")->nullable();
            
            $table->enum("recommended_level", ["Iniciante", "Intermediário", "Avançado"])->default("Iniciante");

            $table->string("players")->nullable();

            $table->enum("status", ["ativa", "pausada", "encerrada"])->default("ativa");

            $table->text("notes")->nullable();

            $table->timestamps();
        });
        /* relacionamentos principais desta tabela:
            pertence a um mestre
            possui personagens
            possui jogadores
            possui localizações
            possui NPCs
            possui monstros
            possui itens
            possui eventos
            possui sessões
            possui coleções
            possui habilidades
            possui rolagens
        */
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void // desfaz a estrutura/alteracao
    {
        Schema::dropIfExists('campaigns');
    }
};
