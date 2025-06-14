<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCoreDomainsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('core_domains', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('platform_id')->default(1);
            $table->string('domain');
            $table->softDeletes();
            $table->timestamps();

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
        Schema::dropIfExists('core_domains');
    }
}
