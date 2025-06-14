<?php
/**
 * Courses
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Courses'], function () {
        Route::resource('courses', 'CoursesController');
        //For Datatable
        Route::post('courses/get', 'CoursesTableController')->name('courses.get');
    });
    
});