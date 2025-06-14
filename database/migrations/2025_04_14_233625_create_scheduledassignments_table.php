<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateScheduledAssignmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('scheduledassignments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('teacher_id')->nullable();
            $table->integer('program_id')->nullable();
			$table->integer('level_id')->nullable();
			$table->integer('lesson_id')->nullable();
			$table->integer('unit_id')->nullable();
			$table->integer('chapter_id')->nullable();
			$table->integer('topic_id')->nullable();
			$table->integer('achievement_id')->nullable();
			$table->integer('source_id')->nullable();
			$table->integer('number_of_questions')->nullable();
			$table->string('working_time')->nullable();
			$table->timestamp('start_date');
			$table->timestamp('end_date')->nullable();
			$table->string('description', 1000)->nullable();
			$table->integer('status')->nullable()->default(0);
			
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
        Schema::dropIfExists('scheduledassignments');
    }
}
