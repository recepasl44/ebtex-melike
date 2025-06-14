<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateScolarshipAssignsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('scholarshipassigns', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('scholarship_id');
			$table->integer('branche_id');
			$table->integer('season_id')->nullable();
			$table->integer('classroom_id');
			$table->integer('session_id');
			$table->integer('level_id')->nullable();
			$table->integer('quota')->nullable()->default(0);
			
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
        Schema::dropIfExists('scolarshipassigns');
    }
}
