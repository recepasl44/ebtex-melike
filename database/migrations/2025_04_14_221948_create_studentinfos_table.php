<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentInfosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('studentinfos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('student_id');
			$table->string('medical_support')->nullable();
			$table->string('special_conditions')->nullable();
			$table->string('extracurricular_activities')->nullable();
			$table->string('hobbies_and_skills')->nullable();
			$table->string('residential_address')->nullable();
			$table->integer('transportation_status')->nullable()->default(0);
			$table->string('emergency_contact_info')->nullable();
			$table->integer('number_of_siblings')->nullable()->default(0);
			$table->integer('birth_order')->nullable()->default(1);
			$table->string('chronic_illness')->nullable();
			$table->string('household_members')->nullable();
			$table->string('psychological_status')->nullable();
			$table->string('academic_performance')->nullable();
			$table->string('support_educations')->nullable();
			$table->string('additional_notes')->nullable();
			
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
        Schema::dropIfExists('studentinfos');
    }
}
