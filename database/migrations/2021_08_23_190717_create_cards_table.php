<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cards', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('lang', 5)->nullable()->default('tr');
            $table->integer('parent_id')->nullable();
            $table->string('title');
            $table->string('slug')->nullable()->default(NULL);
            $table->string('subtitle')->nullable()->default(NULL);
            $table->string('icon')->nullable()->default(NULL);
            $table->string('cover')->nullable()->default(NULL);
            $table->string('description')->nullable()->default(NULL);
            $table->string('link')->nullable()->default(NULL);
            $table->integer('type')->default(0);
            $table->integer('order_by')->default(0);
            $table->integer('status')->default(0);
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
        Schema::dropIfExists('cards');
    }
}
