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
        Schema::create('dice_rolls', function (Blueprint $table) {
            $table->id();
            $table->foreignId('campaign_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('character_id')->nullable()->constrained('characters')->nullOnDelete();
            $table->string('author_name');
            $table->string('author_type');
            $table->unsignedSmallInteger('dice');
            $table->unsignedTinyInteger('quantity')->default(1);
            $table->integer('modifier')->default(0);
            $table->json('results');
            $table->integer('total');
            $table->boolean('critical')->default(false);
            $table->boolean('failure')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dice_rolls');
    }
};
