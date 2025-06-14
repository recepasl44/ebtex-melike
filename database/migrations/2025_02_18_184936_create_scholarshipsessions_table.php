<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuizSessionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('quizsessions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('scholarship_id');
			$table->integer('branche_id');
			$table->integer('program_id')->nullable();
			$table->integer('level_id')->nullable();
			$table->timestamp('session_date');
			
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
        Schema::dropIfExists('quizsessions');
    }
}
