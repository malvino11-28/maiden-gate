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
        Schema::create('campaigns', function (Blueprint $table) {
            $table->id();
            $table->foreignId('master_id')->constrained("users")->onDelete("cascade");
            
            $table->string("name");
            $table->text("description")->nullable();
            $table->string("image")->nullable();
            
            $table->enum("recommended_level", ["Iniciante", "Intermediário", "Avançado"])->default("Iniciante");

            $table->string("players")->nullable();

            $table->enum("status", ["ativa", "pausada", "encerrada"])->default("ativa");

            $table->foreignId('current_location_id')->nullable();

            $table->text("notes")->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('campaigns');
    }
};
