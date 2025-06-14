<?php
/**
 * UserDiscounts
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'UserDiscounts'], function () {
        Route::resource('userdiscounts', 'UserDiscountsController');
        //For Datatable
        Route::post('userdiscounts/get', 'UserDiscountsTableController')->name('userdiscounts.get');
    });
    
});