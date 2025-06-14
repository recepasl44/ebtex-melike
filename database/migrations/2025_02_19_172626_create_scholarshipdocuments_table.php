<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateScholarshipDocumentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('scholarshipdocuments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('scholarship_id');
			$table->string('campus_name');
			$table->string('building_name');
			$table->string('hall_name');
			$table->timestamp('hall_date');
			$table->string('hall_session');
			$table->integer('duration')->nullable()->default(0);
			$table->integer('program_id')->nullable();
			$table->integer('level_id')->nullable();
			$table->integer('school_id')->nullable();
			$table->string('phone')->nullable();
			$table->timestamp('birth_date');
			$table->string('first_name');
			$table->string('last_name');
			$table->string('identity_no');
			$table->integer('gender')->default(0);
			
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
        Schema::dropIfExists('scholarshipdocuments');
    }
}
