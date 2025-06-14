<?php
/**
 * GuardianMeetings
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'GuardianMeetings'], function () {
        Route::resource('guardianmeetings', 'GuardianMeetingsController');
        //For Datatable
        Route::post('guardianmeetings/get', 'GuardianMeetingsTableController')->name('guardianmeetings.get');
    });
    
});