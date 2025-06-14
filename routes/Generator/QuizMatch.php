<?php
/**
 * QuizMatchs
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'QuizMatchs'], function () {
        Route::resource('quizmatches', 'QuizMatchesController');
        //For Datatable
        Route::post('quizmatches/get', 'QuizMatchesTableController')->name('quizmatches.get');
    });
    
});