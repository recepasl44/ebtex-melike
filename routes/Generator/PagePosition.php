<?php
/**
 * PagePositions
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'PagePositions'], function () {
        Route::resource('pagepositions', 'PagePositionsController');
        //For Datatable
        Route::post('pagepositions/get', 'PagePositionsTableController')->name('pagepositions.get');
    });
    
});