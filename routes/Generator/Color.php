<?php
/**
 * Color
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Colors'], function () {
        Route::resource('colors', 'ColorsController');
        //For Datatable
        Route::post('colors/get', 'ColorsTableController')->name('colors.get');
    });
    
});