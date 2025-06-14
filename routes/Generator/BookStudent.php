<?php
/**
 * BookStudents
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'BookStudents'], function () {
        Route::resource('bookstudents', 'BookStudentsController');
        //For Datatable
        Route::post('bookstudents/get', 'BookStudentsTableController')->name('bookstudents.get');
    });
    
});