<?php
/**
 * Meetings
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Meetings'], function () {
        Route::resource('meetings', 'MeetingsController');
        //For Datatable
        Route::post('meetings/get', 'MeetingsTableController')->name('meetings.get');
    });
    
});