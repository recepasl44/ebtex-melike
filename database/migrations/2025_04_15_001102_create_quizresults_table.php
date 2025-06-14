<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuizResultsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('quizresults', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('quiz_id');
			$table->integer('student_id');
			$table->integer('lesson_id')->nullable();
			$table->integer('unit_id')->nullable();
			$table->integer('chapter_id')->nullable();
			$table->integer('topic_id')->nullable();
			$table->integer('achievement_id')->nullable();
			$table->integer('questions')->nullable()->defalut(0);
			$table->integer('corrects')->nullable()->defalut(0);
			$table->integer('wrongs')->nullable()->defalut(0);
			$table->integer('blanks')->nullable()->defalut(0);
			$table->decimal('nets', 8, 2)->nullable()->defalut(0);
			$table->decimal('success_rate', 8, 2)->nullable()->defalut(0);
			
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
        Schema::dropIfExists('quizresults');
    }
}
