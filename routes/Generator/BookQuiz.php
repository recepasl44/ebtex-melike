<?php
/**
 * BookQuizs
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'BookQuizs'], function () {
        Route::resource('bookquizzes', 'BookQuizzesController');
        //For Datatable
        Route::post('bookquizzes/get', 'BookQuizzesTableController')->name('bookquizzes.get');
    });
    
});