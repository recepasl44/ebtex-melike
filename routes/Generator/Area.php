<?php
/**
 * Areas
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Areas'], function () {
        Route::resource('areas', 'AreasController');
        //For Datatable
        Route::post('areas/get', 'AreasTableController')->name('areas.get');
    });
    
});