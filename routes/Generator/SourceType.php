<?php
/**
 * SourceTypes
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'SourceTypes'], function () {
        Route::resource('sourcetypes', 'SourceTypesController');
        //For Datatable
        Route::post('sourcetypes/get', 'SourceTypesTableController')->name('sourcetypes.get');
    });
    
});