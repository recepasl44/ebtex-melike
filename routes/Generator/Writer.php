<?php
/**
 * Writers
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Writers'], function () {
        Route::resource('writers', 'WritersController');
        //For Datatable
        Route::post('writers/get', 'WritersTableController')->name('writers.get');
    });
    
});