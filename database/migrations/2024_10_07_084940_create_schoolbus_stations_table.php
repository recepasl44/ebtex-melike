<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSchoolBusStationsTable extends Migration
{
    public function up()
    {
        Schema::create('schoolbus_stations', function (Blueprint $table) {
            $table->id('station_id');
            $table->string('station_name', 150);
            $table->decimal('latitude', 10, 8);
            $table->decimal('longitude', 10, 8);
            $table->timestamps();

            $table->unsignedInteger('platform_id')->default(1);
            $table->foreign('platform_id')->references('id')->on('core_platforms');
        });
    }

    public function down()
    {
        Schema::dropIfExists('schoolbus_stations');
    }
}
