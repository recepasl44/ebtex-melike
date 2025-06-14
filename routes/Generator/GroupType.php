<?php
/**
 * GroupTypes
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'GroupTypes'], function () {
        Route::resource('grouptypes', 'GroupTypesController');
        //For Datatable
        Route::post('grouptypes/get', 'GroupTypesTableController')->name('grouptypes.get');
    });
    
});