<?php
/**
 * Chapters
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Chapters'], function () {
        Route::resource('chapters', 'ChaptersController');
        //For Datatable
        Route::post('chapters/get', 'ChaptersTableController')->name('chapters.get');
    });
    
});