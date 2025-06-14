<?php
/**
 * Currencies
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Currencies'], function () {
        Route::resource('currencies', 'CurrenciesController');
        //For Datatable
        Route::post('currencies/get', 'CurrenciesTableController')->name('currencies.get');
    });
    
});