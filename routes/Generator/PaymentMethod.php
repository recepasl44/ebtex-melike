<?php
/**
 * PaymentMethods
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'PaymentMethods'], function () {
        Route::resource('paymentmethods', 'PaymentMethodsController');
        //For Datatable
        Route::post('paymentmethods/get', 'PaymentMethodsTableController')->name('paymentmethods.get');
    });
    
});