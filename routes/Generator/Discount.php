<?php
/**
 * Discounts
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Discounts'], function () {
        Route::resource('discounts', 'DiscountsController');
        //For Datatable
        Route::post('discounts/get', 'DiscountsTableController')->name('discounts.get');
    });
    
});