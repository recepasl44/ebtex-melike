<?php
/**
 * GuidanceObservations
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'GuidanceObservations'], function () {
        Route::resource('guidanceobservations', 'GuidanceObservationsController');
        //For Datatable
        Route::post('guidanceobservations/get', 'GuidanceObservationsTableController')->name('guidanceobservations.get');
    });
    
});