<?php
/**
 * QuizSessions
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'QuizSessions'], function () {
        Route::resource('quizsessions', 'QuizSessionsController');
        //For Datatable
        Route::post('quizsessions/get', 'QuizSessionsTableController')->name('quizsessions.get');
    });
    
});