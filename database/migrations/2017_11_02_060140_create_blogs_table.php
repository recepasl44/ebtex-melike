<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateBlogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->increments('id');
            $table->string('lang', 5)->nullable()->default('tr');
            $table->string('name', 191);
            $table->dateTime('publish_datetime');
            $table->string('featured_image', 191);
            $table->text('content');
            $table->string('meta_title', 191)->nullable();
            $table->string('cannonical_link', 191)->nullable();
            $table->string('slug', 191)->nullable();
            $table->text('meta_description', 65535)->nullable();
            $table->text('meta_keywords', 65535)->nullable();
            $table->enum('status', ['Published', 'Draft', 'InActive', 'Scheduled']);
            $table->integer('created_by')->unsigned();
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
        Schema::drop('blogs');
    }
}
