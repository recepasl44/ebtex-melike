<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBulletinsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bulletins', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
			$table->string('content');
			$table->integer('category_id')->nullable();
			$table->timestamp('start_date')->nullable();
			$table->timestamp('end_date')->nullable();
			$table->integer('created_by')->nullable();
			$table->integer('status')->nullable()->defalut(1);
			$table->integer('group_id')->nullable();
			
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
        Schema::dropIfExists('bulletins');
    }
}
