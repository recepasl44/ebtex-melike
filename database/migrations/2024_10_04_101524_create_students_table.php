<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('season_id');
            $table->integer('branche_id');
			$table->integer('nationality_id');
			$table->integer('identification_no');
			$table->integer('gender_id');
			$table->string('first_name');
			$table->string('last_name');
			$table->timestamp('birthday')->nullable();
			$table->integer('program_id');
			$table->integer('level_id');
			$table->integer('course_id')->nullable();
			$table->integer('school_id')->nullable();
			$table->string('email')->nullable();
			$table->string('phone')->nullable();
			$table->string('mobile_phone')->nullable();
			$table->string('blood_type')->nullable();
			$table->string('illness')->nullable();
			$table->string('student_no')->nullable();
			$table->integer('address_id');
			$table->integer('parent_id');
			$table->string('financial_status')->nullable();
			$table->string('additional_information_1')->nullable();
			$table->string('additional_information_2')->nullable();
			$table->integer('created_by')->nullable();
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
        Schema::dropIfExists('students');
    }
}
