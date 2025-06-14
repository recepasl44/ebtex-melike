<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuizMatchesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('quizmatches', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('quiz_type_id')->nullable();
			$table->integer('quiz_id');
			$table->integer('branche_id');
			$table->integer('season_id')->nullable();
			$table->integer('classroom_id')->nullable();
			$table->integer('session_id')->nullable();
			$table->integer('program_id')->nullable();
			$table->integer('level_id');
			$table->integer('quota')->nullable()->default(0);
			
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
        Schema::dropIfExists('quizmatches');
    }
}
