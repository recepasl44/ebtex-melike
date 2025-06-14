<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGuidanceMeetingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('guidancemeetings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('student_id');
			$table->string('meeting_topic')->nullable();
			$table->string('guidance_name')->nullable();
			$table->string('meeting_notes')->nullable();
			$table->timestamp('meeting_date')->nullable();
			
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
        Schema::dropIfExists('guidancemeetings');
    }
}
