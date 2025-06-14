<?php
/**
 * AcademicTitles
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'AcademicTitles'], function () {
        Route::resource('academictitles', 'AcademicTitlesController');
        //For Datatable
        Route::post('academictitles/get', 'AcademicTitlesTableController')->name('academictitles.get');
    });
    
});