<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('author_full_name')->nullable();
			$table->integer('program_id')->nullable();
			$table->integer('level_id')->nullable();
			$table->integer('lesson_id')->nullable();
			$table->integer('unit_id')->nullable();
			$table->integer('chapter_id')->nullable();
			$table->integer('topic_id')->nullable();
			$table->integer('achievement_id')->nullable();
			$table->integer('question_category_id')->nullable();
			$table->integer('places_use_id')->nullable();
			$table->integer('question_type_id')->nullable();
			$table->integer('difficulty_level_id')->nullable();
			$table->integer('suitability_score')->nullable()->default(0);
			$table->integer('exam_type_id');

            $table->string('correct_answer')->nullable();
            $table->integer('page_number');
            $table->integer('x');
            $table->integer('y');
            $table->integer('width');
            $table->integer('height');
            $table->string('image_path')->nullable();
			
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
        Schema::dropIfExists('questions');
    }
}
