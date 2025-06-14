<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('full_name');
			$table->string('identification_no');
			$table->timestamp('birth_day')->nullable();
			$table->integer('type_id')->nullable();
			$table->string('email');
			$table->string('phone_number')->nullable();
			$table->string('address')->nullable();
			$table->integer('gender_id')->nullable()->defalut(0);
			$table->integer('status')->nullable()->defalut(0);
			
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
        Schema::dropIfExists('employees');
    }
}
