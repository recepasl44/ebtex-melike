<?php
/**
 * ScholarshipSettings
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'ScholarshipSettings'], function () {
        Route::resource('scholarshipsettings', 'ScholarshipSettingsController');
        //For Datatable
        Route::post('scholarshipsettings/get', 'ScholarshipSettingsTableController')->name('scholarshipsettings.get');
    });
    
});