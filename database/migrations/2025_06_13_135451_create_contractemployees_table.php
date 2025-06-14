<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContractEmployeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contractemployees', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('employee_id');
			$table->integer('contract_type_id');
			$table->timestamp('start_date');
			$table->integer('work_days')->nullable()->defalut(0);
			$table->decimal('fixed_salary', 8, 2)->nullable()->defalut(0);
			$table->integer('number_of_lessons')->nullable()->defalut(0);
			$table->decimal('lesson_price', 8, 2)->nullable()->defalut(0);
			$table->decimal('day_price', 8, 2)->nullable()->defalut(0);
			$table->decimal('solution_price', 8, 2)->nullable()->defalut(0);
			$table->decimal('coaching_price', 8, 2)->nullable()->defalut(0);
			$table->decimal('private_lesson_price', 8, 2)->nullable()->defalut(0);
			$table->integer('coupon_rate')->nullable()->defalut(0);
			$table->timestamp('end_date')->nullable();
			$table->string('notes')->nullable();
			
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
        Schema::dropIfExists('contractemployees');
    }
}
