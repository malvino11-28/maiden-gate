<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        foreach (['locations', 'npcs', 'items', 'bestiary', 'lore_events'] as $tableName) {
            Schema::table($tableName, function (Blueprint $table) use ($tableName) {
                if (!Schema::hasColumn($tableName, 'visible_to_players')) {
                    $table->boolean('visible_to_players')->default(false)->after('campaign_id');
                }
            });
        }
    }

    public function down(): void
    {
        foreach (['locations', 'npcs', 'items', 'bestiary', 'lore_events'] as $tableName) {
            Schema::table($tableName, function (Blueprint $table) use ($tableName) {
                if (Schema::hasColumn($tableName, 'visible_to_players')) {
                    $table->dropColumn('visible_to_players');
                }
            });
        }
    }
};
