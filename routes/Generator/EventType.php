<?php
/**
 * EventTypes
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'EventTypes'], function () {
        Route::resource('eventtypes', 'EventTypesController');
        //For Datatable
        Route::post('eventtypes/get', 'EventTypesTableController')->name('eventtypes.get');
    });
    
});