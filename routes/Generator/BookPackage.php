<?php
/**
 * BookPackages
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'BookPackages'], function () {
        Route::resource('bookpackages', 'BookPackagesController');
        //For Datatable
        Route::post('bookpackages/get', 'BookPackagesTableController')->name('bookpackages.get');
    });
    
});