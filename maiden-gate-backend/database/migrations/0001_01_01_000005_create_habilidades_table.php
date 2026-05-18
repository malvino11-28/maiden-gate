<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('skills', function(Blueprint $table) {

        $table->id();

        // liga a skill a uma marca (se a marca for deletada, as skills também são)
        $table->foreignId('marca_id')->constrained('marcas')->onDelete('cascade');

        $table->string('name');
        $table->text('descricao');

        $table->enum('categoria', ['Ofensiva', 'Suporte/Defensiva', 'Destreza/Utilidade', 'Passiva', 'Penalidade', 'Ult']);
        $table->Integer('nivel_desbloqueio')->default(1);
        $table->Integer('custo_recurso')->default(0);
        $table->string('alcance');

        $table->timestamps();
        });
}
    public function down(): void {
        Schema::dropIfExist('skills');
    }
};