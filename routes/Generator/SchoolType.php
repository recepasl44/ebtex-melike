<?php
/**
 * SchoolTypes
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'SchoolTypes'], function () {
        Route::resource('schooltypes', 'SchoolTypesController');
        //For Datatable
        Route::post('schooltypes/get', 'SchoolTypesTableController')->name('schooltypes.get');
    });
    
});