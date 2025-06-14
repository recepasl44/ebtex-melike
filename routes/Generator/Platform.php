<?php
/**
 * Platforms
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Platforms'], function () {
        Route::resource('platforms', 'PlatformsController');
        //For Datatable
        Route::post('platforms/get', 'PlatformsTableController')->name('platforms.get');
    });
    
});