<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSlidersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sliders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('lang', 5)->nullable()->default('tr');
            $table->string('cover');
            $table->string('subtitle')->nullable();
            $table->string('title')->nullable();
            $table->string('description')->nullable();
            $table->string('button1')->nullable();
            $table->string('button1_link')->nullable();
            $table->string('button2')->nullable();
            $table->string('button2_link')->nullable();
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
        Schema::dropIfExists('sliders');
    }
}
