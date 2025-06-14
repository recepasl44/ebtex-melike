<?php
/**
 * EventStudents
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'EventStudents'], function () {
        Route::resource('eventstudents', 'EventStudentsController');
        //For Datatable
        Route::post('eventstudents/get', 'EventStudentsTableController')->name('eventstudents.get');
    });
    
});