<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAssignmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('assignments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('teacher_id');
			$table->integer('program_id');
			$table->integer('level_id');
			$table->integer('schooltype_id');
			$table->integer('course_id');
			$table->string('class_section');
			$table->string('subject');
			$table->string('unit_topic');
			$table->string('title');
			$table->integer('source_id');
			$table->timestamp('start_date');
			$table->timestamp('end_date');
			$table->text('description')->nullable();
			$table->string('teacher_file')->nullable();
			$table->integer('category')->nullable()->default(0);
			$table->integer('status')->nullable()->default(0);
			$table->timestamp('teacher_planning_start_date')->nullable();
			$table->timestamp('teacher_planning_end_date')->nullable();
			$table->integer('special_permission')->nullable()->default(0);
			
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
        Schema::dropIfExists('assignments');
    }
}
