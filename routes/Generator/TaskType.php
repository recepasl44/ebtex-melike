<?php
/**
 * TaskTypes
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'TaskTypes'], function () {
        Route::resource('tasktypes', 'TaskTypesController');
        //For Datatable
        Route::post('tasktypes/get', 'TaskTypesTableController')->name('tasktypes.get');
    });
    
});