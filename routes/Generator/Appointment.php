<?php
/**
 * Appointments
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Appointments'], function () {
        Route::resource('appointments', 'AppointmentsController');
        //For Datatable
        Route::post('appointments/get', 'AppointmentsTableController')->name('appointments.get');
    });
    
});