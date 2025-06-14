<?php
/**
 * TestTypes
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'TestTypes'], function () {
        Route::resource('testtypes', 'TestTypesController');
        //For Datatable
        Route::post('testtypes/get', 'TestTypesTableController')->name('testtypes.get');
    });
    
});