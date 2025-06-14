<?php
/**
 * Lessons
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Lessons'], function () {
        Route::resource('lessons', 'LessonsController');
        //For Datatable
        Route::post('lessons/get', 'LessonsTableController')->name('lessons.get');
    });
    
});