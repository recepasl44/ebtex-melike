<?php
/**
 * Vehicles
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Vehicles'], function () {
        Route::resource('vehicles', 'VehiclesController');
        //For Datatable
        Route::post('vehicles/get', 'VehiclesTableController')->name('vehicles.get');
    });
    
});