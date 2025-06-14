<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('first_name', 191);
            $table->string('last_name', 191);
            $table->string('email', 191);
            $table->string('password', 191)->nullable();
            $table->string('username', 191)->nullable();
            $table->boolean('status')->default(1);
            $table->string('confirmation_code', 191)->nullable();
            $table->boolean('confirmed')->default(0);
            $table->boolean('is_term_accept')->default(0)->comment(' 0 = not accepted,1 = accepted');
            $table->string('remember_token', 100)->nullable();
            $table->integer('profile_img')->nullable();
            $table->integer('cover')->nullable();
            $table->integer('bio')->nullable();
            $table->integer('country_id')->nullable();
            $table->integer('city_id')->nullable();
            $table->integer('timezone_id')->nullable();
            $table->integer('lang_id')->nullable();


            $table->integer('created_by')->unsigned()->nullable();
            $table->integer('updated_by')->unsigned()->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->unsignedInteger('platform_id')->default(1);
            $table->foreign('platform_id')->references('id')->on('core_platforms');
            $table->foreign('created_by')->references('id')->on('users');
            $table->foreign('updated_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('users');
    }
}
