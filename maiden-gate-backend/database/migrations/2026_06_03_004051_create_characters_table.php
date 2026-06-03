<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('characters', function (Blueprint $table) {
            $table->id();
             // foreignId('user_id'): cria uma coluna para o ID do dono da ficha.
            // constrained() garante que esse usuário exista na tabela 'users'.
            // onDelete('cascade') se o usuário for deletado, a ficha dele some também.
            $table->foreignId('user_id')->constrained("users")->onDelete('cascade');

            // aqui é o ID da campanha. nullable() significa que o personagem pode estar "sem mesa" no momento (ficha avulsa).
            $table->foreignId('campanha_id')->nullable()->constrained("campaigns")->onDelete('set null');

            $table->foreignId("marca_id")->constrained("marcas")->onDelete("cascade");

            $table->string("name");
            $table->text("lore");
            $table->integer("level")->default(1);
            $table->integer("exp")->default(0);
            
            $table->integer("pod")->default(0);
            $table->integer("res")->default(0);
            $table->integer("des")->default(0);
            $table->integer("intelec")->default(0);
            $table->integer("det")->default(0);
            $table->integer("pre")->default(0);

            $table->integer("hp_current")->default(0);
            $table->integer("hp_max")->default(0);

            $table->string("effect")->nullable();

            $table->integer("pt")->default(0);
            $table->integer("pr")->default(1);
        
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('characters');
    }
};
