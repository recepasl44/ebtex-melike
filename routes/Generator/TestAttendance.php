<?php
/**
 * TestAttendances
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'TestAttendances'], function () {
        Route::resource('testattendances', 'TestAttendancesController');
        //For Datatable
        Route::post('testattendances/get', 'TestAttendancesTableController')->name('testattendances.get');
    });
    
});