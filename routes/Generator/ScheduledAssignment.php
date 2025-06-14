<?php
/**
 * ScheduledAssignments
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'ScheduledAssignments'], function () {
        Route::resource('scheduledassignments', 'ScheduledAssignmentsController');
        //For Datatable
        Route::post('scheduledassignments/get', 'ScheduledAssignmentsTableController')->name('scheduledassignments.get');
    });
    
});