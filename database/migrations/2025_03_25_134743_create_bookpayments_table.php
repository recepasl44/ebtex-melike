<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookPaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookpayments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('total_books');
			$table->decimal('unit_price', 8, 2);
			$table->integer('payment_method_id');
			$table->integer('payment_status_id');
			$table->string('payment_document_url')->nullable();
			
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
        Schema::dropIfExists('bookpayments');
    }
}
