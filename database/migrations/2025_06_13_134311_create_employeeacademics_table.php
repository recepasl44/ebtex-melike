<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeeAcademicsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employeeacademics', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('employee_id');
			$table->integer('education_status_id');
			$table->integer('job_id');
			$table->integer('profession_id');
			$table->integer('academic_title_id');
			$table->integer('experience');
			$table->string('certificates');
			$table->integer('program_id')->nullable();
			$table->integer('level_id')->nullable();
			
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
        Schema::dropIfExists('employeeacademics');
    }
}
