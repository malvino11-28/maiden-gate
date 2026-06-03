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
        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->foreignId("marca_id")->constrained("marcas")->onDelete("cascade");
            $table->string("name");
            $table->text("desc");
            $table->enum("categoria", ["ofensiva", "suporte_defensiva", "destreza_utilidade", "passiva", "penalidade", "ult"]);
            $table->integer("unlock_level")->default(1);
            $table->integer("resource_cost")->default(0);
            $table->string("alcance")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skills');
    }
};
