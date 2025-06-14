<?php
/**
 * QuizAttendances
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'QuizAttendances'], function () {
        Route::resource('quizattendances', 'QuizAttendancesController');
        //For Datatable
        Route::post('quizattendances/get', 'QuizAttendancesTableController')->name('quizattendances.get');
    });
    
});