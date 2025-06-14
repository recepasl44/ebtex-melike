<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFinanceNotesTable extends Migration
{
    public function up()
    {
        Schema::create('finance_notes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('student_id');
            $table->unsignedBigInteger('installment_id')->nullable();
            $table->text('note');
            $table->date('promise_date')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->timestamps();

            $table->foreign('student_id')->references('id')->on('students');
            $table->foreign('installment_id')->references('id')->on('installments');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    public function down()
    {
        Schema::dropIfExists('finance_notes');
    }
}
