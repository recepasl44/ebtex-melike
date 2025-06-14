<?php
/**
 * Seasons
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Seasons'], function () {
        Route::resource('seasons', 'SeasonsController');
        //For Datatable
        Route::post('seasons/get', 'SeasonsTableController')->name('seasons.get');
    });
    
});