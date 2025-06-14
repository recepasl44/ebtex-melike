<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
			$table->integer('type_id')->nullable();
			$table->integer('group_type_id')->nullable();
			$table->integer('group_id')->nullable();
			$table->integer('program_id');
			$table->integer('level_id');
			$table->integer('used_area_id');
			$table->timestamp('start_date');
			$table->timestamp('end_date')->nullable();
			$table->timestamp('estimated_time')->nullable();
			$table->integer('duty_teacher_id')->nullable();
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
        Schema::dropIfExists('events');
    }
}
