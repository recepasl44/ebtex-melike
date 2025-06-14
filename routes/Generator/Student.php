<?php
/**
 * Students
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Students'], function () {
        //For Datatable
        Route::get('students/data', 'StudentsController@data')->name('students.data');
        Route::post('students/data/post', 'StudentsController@postData')->name('students.data.post');
        Route::get('students/list', 'StudentsController@list')->name('students.list');
        Route::post('student/get', 'StudentsTableController')->name('students.get');
        Route::post('student/intenal/get', 'StudentsInternalTableController')->name('students.internal.get');
        Route::get('students/internal/records', 'StudentsController@internalRecords')->name('students.internal.records');
        Route::get('students/{student}/appointments', 'StudentsController@appointments')->name('students.appointments.get');
        Route::get('students/{student}/meetings', 'StudentsController@meetings')->name('students.meetings.get');
        Route::get('students/{student}/discounts', 'StudentsController@discounts')->name('students.discounts.get');
        Route::get('students/{student}/userdiscounts', 'StudentsController@userdiscounts')->name('students.userdiscounts.get');
        Route::get('students/registration', 'StudentsController@registration')->name('students.registration');

        Route::get('students/import', 'StudentsController@import')->name('students.import');
        Route::post('students/post/import', 'StudentsController@postImport')->name('students.import.post');
        Route::resource('students', 'StudentsController');
    });
    
});