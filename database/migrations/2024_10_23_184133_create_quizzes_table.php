<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuizzesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('quizzes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('branche_id');
			$table->text('quiz_no');
			$table->string('name');
			$table->timestamp('quiz_date')->nullable();
			$table->integer('quiz_type_id');
			$table->integer('quiz_category_id');
			$table->integer('point_type_id');
			$table->integer('optical_form_id');
			$table->integer('level_id');
			$table->integer('wrong_right')->nullable()->default(4);
			$table->integer('topic_achievement')->nullable();
			$table->integer('is_print')->nullable()->default(0);
			
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
        Schema::dropIfExists('quizzes');
    }
}
