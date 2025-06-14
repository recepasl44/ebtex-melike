<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentPsychologicalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('studentpsychologicals', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('student_id');
			$table->string('psychological_support')->nullable();
			$table->string('emotional_reactions')->nullable();
			$table->integer('activity_participation')->nullable()->default(0);
			$table->integer('communication_skills')->nullable();
			
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
        Schema::dropIfExists('studentpsychologicals');
    }
}
