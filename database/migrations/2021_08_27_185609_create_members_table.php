<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMembersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('members', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('lang', 5)->nullable()->default('tr');
            $table->string('name');
            $table->string('title')->nullable()->default(NULL);
            $table->string('cover')->nullable()->default(NULL);
            $table->string('facebook')->nullable()->default(NULL);
            $table->string('twitter')->nullable()->default(NULL);
            $table->string('instagram')->nullable()->default(NULL);
            $table->string('linkedin')->nullable()->default(NULL);
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
        Schema::dropIfExists('members');
    }
}
