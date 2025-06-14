<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServicePlansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('serviceplans', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('vehicle_id');
			$table->integer('driver_id');
			$table->integer('session_id')->nullable()->defalut(0);
			$table->integer('route_id')->nullable();
			$table->timestamp('start_date')->nullable();
			$table->timestamp('end_date')->nullable();
			$table->integer('passengers')->nullable()->defalut(0);
			$table->integer('status')->nullable()->defalut(0);
			
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
        Schema::dropIfExists('serviceplans');
    }
}
