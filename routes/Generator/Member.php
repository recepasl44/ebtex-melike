<?php
/**
 * Members
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Members'], function () {
        Route::resource('members', 'MembersController');
        //For Datatable
        Route::post('members/get', 'MembersTableController')->name('members.get');
    });
    
});