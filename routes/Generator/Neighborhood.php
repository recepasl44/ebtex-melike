<?php
/**
 * Neighborhoods
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Neighborhoods'], function () {
        Route::resource('neighborhoods', 'NeighborhoodsController');
        //For Datatable
        Route::post('neighborhoods/get', 'NeighborhoodsTableController')->name('neighborhoods.get');
    });
    
});