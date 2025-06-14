<?php
/**
 * Districts
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Districts'], function () {
        Route::resource('districts', 'DistrictsController');
        //For Datatable
        Route::post('districts/get', 'DistrictsTableController')->name('districts.get');
    });
    
});