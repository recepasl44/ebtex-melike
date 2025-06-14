<?php
/**
 * Institutions
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Institutions'], function () {
        Route::resource('institutions', 'InstitutionsController');
        //For Datatable
        Route::post('institutions/get', 'InstitutionsTableController')->name('institutions.get');
    });
    
});