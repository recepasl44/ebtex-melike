<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSchoolsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schools', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
			$table->integer('country_id');
			$table->integer('city_id');
			$table->integer('county_id');
			$table->string('code')->nullable();
			$table->string('website')->nullable();
			$table->string('address')->nullable();
			$table->string('phone')->nullable();
			$table->string('email')->nullable();
			$table->string('fax')->nullable();
			$table->string('additional_information')->nullable();
			$table->integer('type_id')->default(null)->nullable();
			
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
        Schema::dropIfExists('schools');
    }
}
