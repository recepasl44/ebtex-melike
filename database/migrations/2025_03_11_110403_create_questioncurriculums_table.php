<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionCurriculumsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questioncurriculums', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('question_id');
			$table->integer('lesson_id')->nullable();
			$table->integer('unit_id')->nullable();
			$table->integer('chapter_id')->nullable();
			$table->integer('topic_id')->nullable();
			$table->integer('achievement_id')->nullable();
			$table->integer('repetition')->nullable()->default(1);
			
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
        Schema::dropIfExists('questioncurriculums');
    }
}
