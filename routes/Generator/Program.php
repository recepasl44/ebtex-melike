<?php
/**
 * Programs
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Programs'], function () {
        Route::resource('programs', 'ProgramsController');
        //For Datatable
        Route::post('programs/get', 'ProgramsTableController')->name('programs.get');
    });
    
});