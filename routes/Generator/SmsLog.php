<?php
/**
 * SmsLogs
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'SmsLogs'], function () {
        Route::resource('smslogs', 'SmsLogsController');
        //For Datatable
        Route::post('smslogs/get', 'SmsLogsTableController')->name('smslogs.get');
    });
    
});