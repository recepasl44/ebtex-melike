<?php
/**
 * Classes
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Classes'], function () {
        Route::resource('classes', 'ClassesController');
        //For Datatable
        Route::post('classes/get', 'ClassesTableController')->name('classes.get');
    });
    
});