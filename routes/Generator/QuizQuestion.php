<?php
/**
 * QuizQuestions
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'QuizQuestions'], function () {
        Route::resource('quizquestions', 'QuizQuestionsController');
        //For Datatable
        Route::post('quizquestions/get', 'QuizQuestionsTableController')->name('quizquestions.get');
    });
    
});