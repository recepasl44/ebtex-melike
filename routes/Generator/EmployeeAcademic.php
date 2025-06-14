<?php
/**
 * EmployeeAcademics
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'EmployeeAcademics'], function () {
        Route::resource('employeeacademics', 'EmployeeAcademicsController');
        //For Datatable
        Route::post('employeeacademics/get', 'EmployeeAcademicsTableController')->name('employeeacademics.get');
    });
    
});