<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('characters', 'attribute_modifiers')) {
            Schema::table('characters', function (Blueprint $table) {
                $table->json('attribute_modifiers')->nullable();
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('characters', 'attribute_modifiers')) {
            Schema::table('characters', function (Blueprint $table) {
                $table->dropColumn('attribute_modifiers');
            });
        }
    }
};