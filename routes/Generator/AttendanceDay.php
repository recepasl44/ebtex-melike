<?php
/**
 * AttendanceDays
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'AttendanceDays'], function () {
        Route::resource('attendancedays', 'AttendanceDaysController');
        //For Datatable
        Route::post('attendancedays/get', 'AttendanceDaysTableController')->name('attendancedays.get');
    });
    
});