<?php
/**
 * GuidanceMeetings
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'GuidanceMeetings'], function () {
        Route::resource('guidancemeetings', 'GuidanceMeetingsController');
        //For Datatable
        Route::post('guidancemeetings/get', 'GuidanceMeetingsTableController')->name('guidancemeetings.get');
    });
    
});