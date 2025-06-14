<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSmsProvidersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('smsproviders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('user_id');
			$table->string('provider');
			$table->string('username')->nullable();
			$table->string('password')->nullable();
			$table->string('api_key')->nullable();
			$table->string('api_secret')->nullable();
			$table->string('origin')->nullable()->defalut('TESIRKOLEJI');
			
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
        Schema::dropIfExists('smsproviders');
    }
}
