<?php
/**
 * Attendances
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Attendances'], function () {
        Route::resource('attendances', 'AttendancesController');
        //For Datatable
        Route::post('attendances/get', 'AttendancesTableController')->name('attendances.get');
    });
    
});