<?php
/**
 * AttendanceTeachers
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'AttendanceTeachers'], function () {
        Route::resource('attendanceteachers', 'AttendanceTeachersController');
        //For Datatable
        Route::post('attendanceteachers/get', 'AttendanceTeachersTableController')->name('attendanceteachers.get');
    });
    
});