<?php
/**
 * City
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Cities'], function () {
        Route::resource('cities', 'CitiesController');
        //For Datatable
        Route::post('cities/get', 'CitiesTableController')->name('cities.get');
    });
    
});