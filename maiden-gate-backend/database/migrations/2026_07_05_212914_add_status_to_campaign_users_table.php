<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('campaign_user', function (Blueprint $table) {
            $table
                ->foreignId('character_id')
                ->nullable()
                ->after('user_id')
                ->constrained('characters')
                ->nullOnDelete();

            $table
                ->enum('status', ['pending', 'accepted', 'rejected'])
                ->default('pending')
                ->after('character_id');

            $table
                ->timestamp('responded_at')
                ->nullable()
                ->after('status');

            $table
                ->text('response_message')
                ->nullable()
                ->after('responded_at');

        });
    }

    public function down(): void
    {
        Schema::table('campaign_user', function (Blueprint $table) {
            $table->dropUnique(['campaign_id', 'user_id']);
            $table->dropConstrainedForeignId('character_id');
            $table->dropColumn(['status', 'responded_at', 'response_message']);
        });
    }
};