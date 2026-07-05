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
            Schema::create('skills', function (Blueprint $table) {
                $table->foreignId('marca_id')->nullable()->constrained('marcas')->cascadeOnDelete();
                $table->foreignId('campaign_id')->nullable()->constrained('campaigns')->cascadeOnDelete();

                $table->string('name');
                $table->text('description')->nullable();

                $table->enum('type', [
                    'ativa',
                    'passiva',
                    'penalidade',
                    'campanha'
                ]);

                $table->enum('branch', [
                    'ofensivo',
                    'suporte',
                    'destreza',
                    'passivas',
                    'penalidade',
                    'campanha'
                ])->nullable();

                $table->string('image')->nullable();
                $table->integer('unlock_level')->default(1);
                $table->integer('resource_cost')->default(0);
                $table->string('range')->nullable();
                $table->timestamps();
            });
        }

        /**
         * Reverse the migrations.
         */
        public function down(): void
        {
            Schema::dropIfExists('skills');
        }
    };
