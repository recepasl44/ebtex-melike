<?php
/**
 * Jobs
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Jobs'], function () {
        Route::resource('jobs', 'JobsController');
        //For Datatable
        Route::post('jobs/get', 'JobsTableController')->name('jobs.get');
    });
    
});