<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSchoolBusDrivingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schoolbus_drivings', function (Blueprint $table) {
            $table->id('driving_id');
            $table->string('first_name', 100);
            $table->string('last_name', 100);
            $table->string('phone', 15);
            $table->string('licence_class', 5);
            $table->date('licence_date');
            $table->boolean('src')->default(0);
            $table->string('src_file_path')->nullable();
            $table->enum('status', ['active', 'inactive', 'pending'])->default('pending');
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
        Schema::dropIfExists('schoolbus_drivings');
    }
}
