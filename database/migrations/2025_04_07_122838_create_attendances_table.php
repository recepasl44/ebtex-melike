<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttendancesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attendances', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
			$table->integer('group_type_id')->nullable();
			$table->integer('group_id')->nullable();
			$table->integer('program_id')->nullable();
			$table->integer('level_id')->nullable();
			$table->timestamp('start_date')->nullable();
			$table->timestamp('end_date')->nullable();
			$table->timestamp('start_time')->nullable();
			$table->integer('used_area_id')->nullable();
			$table->integer('status')->nullable();

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
        Schema::dropIfExists('attendances');
    }
}
