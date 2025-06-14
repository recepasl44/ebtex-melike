<?php
/**
 * ServiceTypes
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'ServiceTypes'], function () {
        Route::resource('servicetypes', 'ServiceTypesController');
        //For Datatable
        Route::post('servicetypes/get', 'ServiceTypesTableController')->name('servicetypes.get');
    });
    
});