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
        Schema::create('bestiary', function (Blueprint $table) {
            $table->id();
            $table->foreignId('campaign_id')->nullable()->constrained('campaigns')->cascadeOnDelete();

            $table->string("image")->nullable();
            $table->string("name");
            $table->string('threat')->nullable();
            $table->string("type")->nullable();
            $table->text("description");

            $table->jsonb("skills");
            $table->jsonb("stats");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bestiary');
    }
};
