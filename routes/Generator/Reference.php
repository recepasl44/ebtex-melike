<?php
/**
 * References
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'References'], function () {
        Route::resource('references', 'ReferencesController');
        //For Datatable
        Route::post('references/get', 'ReferencesTableController')->name('references.get');
    });
    
});