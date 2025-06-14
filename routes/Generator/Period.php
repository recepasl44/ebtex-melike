<?php
/**
 * BookPackages
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Periods'], function () {
        Route::resource('periods', 'PeriodsController');
        //For Datatable
        Route::post('periods/get', 'PeriodsTableController')->name('periods.get');
    });
    
});