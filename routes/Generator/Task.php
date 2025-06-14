<?php
/**
 * Tasks
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Tasks'], function () {
        Route::resource('tasks', 'TasksController');
        //For Datatable
        Route::post('tasks/get', 'TasksTableController')->name('tasks.get');
    });
    
});