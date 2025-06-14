<?php
/**
 * ContractEmployees
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'ContractEmployees'], function () {
        Route::resource('contractemployees', 'ContractEmployeesController');
        //For Datatable
        Route::post('contractemployees/get', 'ContractEmployeesTableController')->name('contractemployees.get');
    });
    
});