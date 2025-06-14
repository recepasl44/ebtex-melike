<?php
/**
 * Guardians
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Guardians'], function () {
        Route::resource('guardians', 'GuardiansController');
        //For Datatable
        Route::post('guardians/get', 'GuardiansTableController')->name('guardians.get');
    });
    
});