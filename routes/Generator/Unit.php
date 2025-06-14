<?php
/**
 * Units
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Units'], function () {
        Route::resource('units', 'UnitsController');
        //For Datatable
        Route::post('units/get', 'UnitsTableController')->name('units.get');
    });
    
});