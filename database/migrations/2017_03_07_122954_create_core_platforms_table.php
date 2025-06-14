<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCorePlatformsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('core_platforms', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('owner_name');
            $table->string('phone')->nullable()->default('null');
            $table->string('gsm')->unique();
            $table->string('mail')->unique();
            $table->integer('status')->default(0);
            $table->softDeletes();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('core_platforms');
    }
}
