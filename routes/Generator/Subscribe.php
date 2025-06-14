<?php
/**
 * Subscribes
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Subscribes'], function () {
        Route::resource('subscribes', 'SubscribesController');
        //For Datatable
        Route::post('subscribes/get', 'SubscribesTableController')->name('subscribes.get');
    });
    
});