<?php
/**
 * Installments
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Installments'], function () {
        Route::resource('installments', 'InstallmentsController');
        //For Datatable
        Route::post('installments/get', 'InstallmentsTableController')->name('installments.get');
    });
    
});