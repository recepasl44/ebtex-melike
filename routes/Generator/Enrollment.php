<?php
/**
 * Enrollments
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Enrollments'], function () {
        Route::resource('enrollments', 'EnrollmentsController');
        //For Datatable
        Route::post('enrollments/get', 'EnrollmentsTableController')->name('enrollments.get');
    });
    
});