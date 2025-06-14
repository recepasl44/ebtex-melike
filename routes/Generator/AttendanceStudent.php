<?php
/**
 * AttendanceStudents
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'AttendanceStudents'], function () {
        Route::resource('attendancestudents', 'AttendanceStudentsController');
        //For Datatable
        Route::post('attendancestudents/get', 'AttendanceStudentsTableController')->name('attendancestudents.get');
    });
    
});