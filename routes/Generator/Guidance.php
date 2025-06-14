<?php
/**
 * Guidances
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Guidances'], function () {
        Route::resource('guidances', 'GuidancesController');
        //For Datatable
        Route::post('guidances/get', 'GuidancesTableController')->name('guidances.get');
    });
    
});