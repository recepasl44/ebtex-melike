<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWeightIndicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('weightindices', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('student_id');
			$table->decimal('height', 8, 2)->default(0);
			$table->decimal('weight', 8, 2)->default(0);
			$table->decimal('indice', 8, 2)->nullable()->default(0);
			
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
        Schema::dropIfExists('weightindices');
    }
}
