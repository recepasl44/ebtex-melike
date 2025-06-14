<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGuidancesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('guidances', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamp('guidance_date');
			$table->integer('user_id');
			$table->integer('lesson_id')->nullable();
			$table->integer('unit_id')->nullable();
			$table->integer('chapter_id')->nullable();
			$table->integer('topic_id')->nullable();
			$table->integer('achievement_id')->nullable();
			$table->integer('source_id')->nullable();
			$table->string('page_range')->nullable();
			$table->integer('questions_number')->nullable()->default(0);
			$table->integer('status')->nullable()->default(0);
			$table->integer('created_by')->nullable()->default(1);
			
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
        Schema::dropIfExists('guidances');
    }
}
