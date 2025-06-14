<?php
/**
 * Sources
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Sources'], function () {
        Route::resource('sources', 'SourcesController');
        //For Datatable
        Route::post('sources/get', 'SourcesTableController')->name('sources.get');
    });
    
});