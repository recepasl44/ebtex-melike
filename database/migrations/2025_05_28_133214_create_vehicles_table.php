<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVehiclesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('plate_no');
			$table->integer('model_id')->nullable();
			$table->string('model_year')->nullable();
			$table->string('owner')->nullable();
			$table->integer('driver_id')->nullable();
			$table->string('vin')->nullable();
			$table->timestamp('check_date')->nullable();
			$table->timestamp('insurance_date')->nullable();
			$table->timestamp('mtv_date')->nullable();
			$table->integer('capacity')->nullable()->default(0);
			$table->integer('status')->nullable()->default(1);
			$table->decimal('lat')->nullable();
			$table->decimal('long')->nullable();

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
        Schema::dropIfExists('vehicles');
    }
}
