<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuizNotesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('quiznotes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('type_id')->nullable()->default(0);
			$table->string('note');
			$table->integer('program_id')->nullable();
			$table->integer('level_id')->nullable();
			$table->integer('status')->nullable()->default(1);
			
            $table->timestamps();

            $table->unsignedInteger('platform_id')->default(1);
            $table->foreign('platform_id')->references('id')->on('core_platforms');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('quiznotes');
    }
}
