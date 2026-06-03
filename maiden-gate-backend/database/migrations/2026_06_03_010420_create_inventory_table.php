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
        Schema::create('inventory', function (Blueprint $table) {
            $table->id();
            $table->foreignId("character_id")->constrained("characters")->onDelete("cascade");
            $table->foreignId("item_id")->constrained("items");
            $table->integer("quantity")->default(1);
            $table->unique(["character_id", "item_id"]); // evitando inventário clonado e item clonado   
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventory');
    }
};
