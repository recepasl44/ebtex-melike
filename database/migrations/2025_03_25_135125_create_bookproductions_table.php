<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookProductionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('book_production', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('production_status')->nullable()->default(0);
			$table->integer('distribution_status')->nullable()->default(0);
			$table->integer('delivery_status')->nullable()->default(0);
			$table->string('cargo_tracking_number')->nullable();
			
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
        Schema::dropIfExists('book_production');
    }
}
