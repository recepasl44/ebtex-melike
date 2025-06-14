<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateScholarshipSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('scholarshipsettings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('scholarship_id')->nullable()->default(0);
            $table->integer('display_status')->nullable()->default(0);
			$table->integer('class_appointment')->nullable()->default(0);
			$table->integer('application_received_sms')->nullable()->default(0);
			$table->integer('phone_verification')->nullable()->default(0);
			$table->integer('own_student_registration')->nullable()->default(0);
			$table->integer('scholarship_rate')->nullable()->default(0);
			$table->integer('result_score')->nullable()->default(0);
			$table->integer('result_sorting')->nullable()->default(0);
			$table->integer('exam_price_status')->nullable()->default(1);
			$table->decimal('exam_price')->nullable()->default(0);
			$table->string('information_document', 191)->nullable();
			$table->string('specification', 191)->nullable();
			$table->timestamp('doc_announcement_date')->nullable();
			$table->string('bank_name', 191)->nullable();
			$table->string('bank_branch_code', 191)->nullable();
			$table->string('bank_account_number', 191)->nullable();
			$table->string('bank_account_type', 191)->nullable();
			$table->string('payment_receipt', 191)->nullable();

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
        Schema::dropIfExists('scholarshipsettings');
    }
}
