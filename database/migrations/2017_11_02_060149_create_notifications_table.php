<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateNotificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title', 191);
            $table->string('content', 191);
            $table->integer('category_id')->nullable();
            $table->integer('source_id')->nullable();
            $table->integer('sender_id')->nullable();
            $table->integer('send_time')->nullable();
            $table->integer('status')->nullable()->default(1);
            $table->integer('user_id')->unsigned()->index('notifications_user_id_foreign');
            $table->boolean('type')->default(1)->comment('1 - Dashboard , 2 - Email , 3 - Both');
            $table->boolean('is_read')->default(0);
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
        Schema::drop('notifications');
    }
}
