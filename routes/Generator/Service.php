<?php
/**
 * Services
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Services'], function () {
        Route::resource('services', 'ServicesController');
        //For Datatable
        Route::post('services/get', 'ServicesTableController')->name('services.get');
    });
    
});