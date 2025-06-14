<?php
/**
 * PaymentStatuses
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'PaymentStatuses'], function () {
        Route::resource('paymentstatuses', 'PaymentStatusesController');
        //For Datatable
        Route::post('paymentstatuses/get', 'PaymentStatusesTableController')->name('paymentstatuses.get');
    });
    
});