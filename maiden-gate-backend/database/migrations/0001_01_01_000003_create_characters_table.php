<?php
// importações de bibliotecas que o laravel usa para lidar com o banco.
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// aqui define uma classe anônima que estende a classe Migration.
// é o padrão para o laravel saber que isso aqui é uma instrução de banco de dados.
return new class extends Migration {
    /**
     * o método UP é executado quando roda a migration (cria a tabela).
     */
    public function up(): void {
        
        // schema::create diz: "Crie uma tabela chamada 'characters'".
        // O $table é o objeto que usamos para definir as colunas.
        Schema::create('characters', function(Blueprint $table) {

        $table->id(); // cria coluna id de autoincremento

        // foreignId('user_id'): cria uma coluna para o ID do dono da ficha.
        // constrained() garante que esse usuário exista na tabela 'users'.
        // onDelete('cascade') se o usuário for deletado, a ficha dele some também.
        $table->foreignId('user_id')->constrained()->onDelete('cascade');

        // aqui é o ID da campanha. nullable() significa que o personagem pode estar "sem mesa" no momento (ficha avulsa).
        $table->foreignId('campanha_id')->nullable()->constrained()->onDelete('set null');

        // string('name') cria uma coluna de texto para o nome.
        $table->string('name');

        // integer('level') cria uma coluna de número inteiro
        // default(1) se você não disser o nível, ele começa no 1
        $table->integer('level')->default(1);
        $table->integer('exp')->default(0);

        // seus atributos do RPG (POD, DES, RES...)
        // todos são inteiros e começam em 0 por padrão.
        $table->integer('pod')->default(0);
        $table->integer('des')->default(0);
        $table->integer('res')->default(0);
        $table->integer('int')->default(0);
        $table->integer('det')->default(0);
        $table->integer('pre')->default(0);

        // pontos de vida (HP) e energia
        $table->integer('hp_current')->default(0);
        $table->integer('hp_max')->default(0);
        // pt e pr a decidir

        // cria automaticamente duas colunas, created_at e updated_at
        // isso registra quando a ficha foi criada e quando foi editada

        $table->timestamps();
        });
    }
        public function down(): void { // método down
            //deleta tabela characters
            Schema::dropIfExists('characters');
        }
};