<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('services', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('branche_id')->nullable();
			$table->integer('level_id')->nullable();
			$table->integer('course_id')->nullable();
			$table->integer('program_id')->nullable();
			$table->timestamp('start_installment_date')->nullable();
			$table->timestamp('end_installment_date')->nullable();
			$table->string('name');
			$table->decimal('price', 8, 2)->default(0);
            $table->integer('is_main')->nullable()->default(0);
            $table->integer('max_installments')->nullable()->default(1);
            $table->integer('max_discounts')->nullable()->default(0);
            $table->integer('accept_discount')->nullable()->default(0);

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
        Schema::dropIfExists('services');
    }
}
