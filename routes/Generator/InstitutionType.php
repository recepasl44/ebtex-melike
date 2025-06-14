<?php
/**
 * InstitutionTypes
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'InstitutionTypes'], function () {
        Route::resource('institutiontypes', 'InstitutionTypesController');
        //For Datatable
        Route::post('institutiontypes/get', 'InstitutionTypesTableController')->name('institutiontypes.get');
    });
    
});