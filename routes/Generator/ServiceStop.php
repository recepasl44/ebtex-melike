<?php
/**
 * ServiceStops
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'ServiceStops'], function () {
        Route::resource('servicestops', 'ServiceStopsController');
        //For Datatable
        Route::post('servicestops/get', 'ServiceStopsTableController')->name('servicestops.get');
    });
    
});