<?php
/**
 * ContractTypes
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'ContractTypes'], function () {
        Route::resource('contracttypes', 'ContractTypesController');
        //For Datatable
        Route::post('contracttypes/get', 'ContractTypesTableController')->name('contracttypes.get');
    });
    
});