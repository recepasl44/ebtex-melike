<?php
/**
 * Points
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Points'], function () {
        Route::resource('points', 'PointsController');
        //For Datatable
        Route::post('points/get', 'PointsTableController')->name('points.get');
    });
    
});