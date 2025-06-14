<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookPackagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookpackages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
			$table->integer('default_total_questions')->nullable()->default(0);
			$table->integer('default_standard')->nullable()->default(0);
			$table->integer('default_flexible')->nullable()->default(0);
			
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
        Schema::dropIfExists('bookpackages');
    }
}
