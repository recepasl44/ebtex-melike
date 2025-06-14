<?php
/**
 * PageTypes
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'PageTypes'], function () {
        Route::resource('pagetypes', 'PageTypesController');
        //For Datatable
        Route::post('pagetypes/get', 'PageTypesTableController')->name('pagetypes.get');
    });
    
});