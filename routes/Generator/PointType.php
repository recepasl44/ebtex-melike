<?php
/**
 * PointTypes
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'PointTypes'], function () {
        Route::resource('pointtypes', 'PointTypesController');
        //For Datatable
        Route::post('pointtypes/get', 'PointTypesTableController')->name('pointtypes.get');
    });
    
});