<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSchoolBusInfosTable extends Migration
{
    public function up()
    {
        Schema::create('schoolbus_infos', function (Blueprint $table) {
            $table->id('schoolbus_id');
            $table->string('brand', 50);
            $table->string('model', 50);
            $table->string('year', 10);
            $table->string('plate', 20);
            $table->string('chassis_number', 30);
            $table->date('inspection_date');
            $table->string('seats', 5);
            $table->timestamps();

            $table->unsignedInteger('platform_id')->default(1);
            $table->foreign('platform_id')->references('id')->on('core_platforms');
        });
    }

    public function down()
    {
        Schema::dropIfExists('schoolbus_infos');
    }
}