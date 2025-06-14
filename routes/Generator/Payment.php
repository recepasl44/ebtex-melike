<?php
/**
 * Payments
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Payments'], function () {
        Route::resource('payments', 'PaymentsController');
        //For Datatable
        Route::post('payments/get', 'PaymentsTableController')->name('payments.get');
    });
    
});