<?php
/**
 * QuizStudents
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'QuizStudents'], function () {
        Route::resource('quizstudents', 'QuizStudentsController');
        //For Datatable
        Route::post('quizstudents/get', 'QuizStudentsTableController')->name('quizstudents.get');
    });
    
});