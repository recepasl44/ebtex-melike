<?php
/**
 * Groups
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Groups'], function () {
        Route::resource('groups', 'GroupsController');
        //For Datatable
        Route::post('groups/get', 'GroupsTableController')->name('groups.get');
    });
    
});