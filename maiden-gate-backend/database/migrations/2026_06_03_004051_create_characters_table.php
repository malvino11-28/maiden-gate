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
            $table->foreignId("user_id");
            $table->foreignId("campaing_id")->nullable();
            $table->foreignId("marca_id");
            $table->string("name");
            $table->text("lore");
            $table->integer("level");
            $table->integer("exp");
            
            $table->integer("pod");
            $table->integer("res");
            $table->integer("des");
            $table->integer("intelec");
            $table->integer("det");
            $table->integer("pre");

            $table->integer("hp_current");
            $table->integer("hp_max");
            $table->string("effect");

            $table->integer("pt");
            $table->integer("pr");
        
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
