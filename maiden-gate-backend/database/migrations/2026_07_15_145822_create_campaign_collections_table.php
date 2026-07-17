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
        Schema::create('campaign_collections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('campaign_id')->constrained('campaigns')->cascadeOnDelete();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('color')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('visible_to_players')->default(false);
            $table->timestamps();
        });

        foreach (['locations', 'npcs', 'items', 'bestiary', 'lore_events', 'skills'] as $tableName) {
            Schema::table($tableName, function (Blueprint $table) {
                $table
                    ->foreignId('collection_id')
                    ->nullable()
                    ->after('campaign_id')
                    ->constrained('campaign_collections')
                    ->nullOnDelete();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        foreach (['locations', 'npcs', 'items', 'bestiary', 'lore_events', 'skills'] as $tableName) {
            Schema::table($tableName, function (Blueprint $table) {
                $table->dropConstrainedForeignId('collection_id');
            });
        }

        Schema::dropIfExists('campaign_collections');
    }
};
