<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAssignmentStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('assignmentstudents', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('assignment_id');
			$table->integer('student_id');
			$table->decimal('completion_percentage', 8, 2);
			$table->integer('delay_days')->nullable()->default(0);
			$table->string('student_file')->nullable();
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
        Schema::dropIfExists('assignmentstudents');
    }
}
