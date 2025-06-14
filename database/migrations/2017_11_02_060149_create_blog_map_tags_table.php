<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateBlogMapTagsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blog_map_tags', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('blog_id')->unsigned()->index();
            $table->integer('tag_id')->unsigned()->index();

            $table->unsignedInteger('platform_id')->default(1);
            $table->foreign('platform_id')->references('id')->on('core_platforms');
            $table->foreign('blog_id')->references('id')->on('blogs');
            $table->foreign('tag_id')->references('id')->on('blog_tags');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('blog_map_tags');
    }
}
