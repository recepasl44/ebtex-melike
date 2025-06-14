<?php
/**
 * ComponentValues
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'ComponentValues'], function () {
        Route::resource('componentvalues', 'ComponentValuesController');
        //For Datatable
        Route::post('componentvalues/get', 'ComponentValuesTableController')->name('componentvalues.get');
    });
    
});