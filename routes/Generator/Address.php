<?php
/**
 * Addresses
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Addresses'], function () {
        Route::resource('addresses', 'AddressesController');
        //For Datatable
        Route::post('addresses/get', 'AddressesTableController')->name('addresses.get');
    });
    
});