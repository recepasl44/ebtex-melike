<?php
/**
 * Employees
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Employees'], function () {
        Route::resource('employees', 'EmployeesController');
        //For Datatable
        Route::post('employees/get', 'EmployeesTableController')->name('employees.get');
    });
    
});