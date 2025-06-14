<?php
/**
 * Sliders
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Sliders'], function () {
        Route::resource('sliders', 'SlidersController');
        //For Datatable
        Route::post('sliders/get', 'SlidersTableController')->name('sliders.get');
    });
    
});