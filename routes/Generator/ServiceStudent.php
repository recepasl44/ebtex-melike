<?php
/**
 * ServiceStudents
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'ServiceStudents'], function () {
        Route::resource('servicestudents', 'ServiceStudentsController');
        //For Datatable
        Route::post('servicestudents/get', 'ServiceStudentsTableController')->name('servicestudents.get');
    });
    
});