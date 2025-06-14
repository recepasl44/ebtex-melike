<?php
/**
 * AssignmentStudents
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'AssignmentStudents'], function () {
        Route::resource('assignmentstudents', 'AssignmentStudentsController');
        //For Datatable
        Route::post('assignmentstudents/get', 'AssignmentStudentsTableController')->name('assignmentstudents.get');
    });
    
});