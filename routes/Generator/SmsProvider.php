<?php
/**
 * SmsProviders
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'SmsProviders'], function () {
        Route::resource('smsproviders', 'SmsProvidersController');
        //For Datatable
        Route::post('smsproviders/get', 'SmsProvidersTableController')->name('smsproviders.get');
    });
    
});