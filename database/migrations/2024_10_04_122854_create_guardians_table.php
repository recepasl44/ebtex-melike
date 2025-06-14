<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGuardiansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('guardians', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('is_alive')->nullable()->default(1);
			$table->integer('is_parent')->nullable()->default(0);
			$table->integer('is_divorced')->nullable()->default(0);
			$table->integer('identification_no');
			$table->string('full_name');
			$table->string('phone');
			$table->string('profession')->nullable();
			$table->string('home_phone')->nullable();
			$table->string('work_phone')->nullable();
			$table->string('address');
			$table->string('work_address')->nullable();
			$table->timestamp('birthday')->nullable();
			$table->string('workplace')->nullable();
			$table->string('email')->nullable();
			$table->timestamp('wedding_anniversary')->nullable();
			$table->integer('student_id');
			$table->integer('kinship_id')->default(0);
			$table->string('kinship')->nullable();
			
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
        Schema::dropIfExists('guardians');
    }
}
