<?php
/**
 * StudentGroups
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'StudentGroups'], function () {
        Route::resource('studentgroups', 'StudentGroupsController');
        //For Datatable
        Route::post('studentgroups/get', 'StudentGroupsTableController')->name('studentgroups.get');
    });
    
});