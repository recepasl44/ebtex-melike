<?php
/**
 * Booklets
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Booklets'], function () {
        Route::resource('booklets', 'BookletsController');
        //For Datatable
        Route::post('booklets/get', 'BookletsTableController')->name('booklets.get');
    });
    
});