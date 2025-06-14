<?php
/**
 * Counties
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Counties'], function () {
        Route::resource('counties', 'CountiesController');
        //For Datatable
        Route::post('counties/get', 'CountiesTableController')->name('counties.get');
    });
    
});