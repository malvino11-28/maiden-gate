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
        Schema::create('lore_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId("campaign_id")->nullable()->constrained("campaigns")->onDelete("cascade");
            $table->string("title");
            $table->text("desc");
            $table->string("chronology");
            $table->string("event_date")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lore_events');
    }
};
