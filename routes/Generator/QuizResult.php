<?php
/**
 * QuizResults
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'QuizResults'], function () {
        Route::resource('quizresults', 'QuizResultsController');
        //For Datatable
        Route::post('quizresults/get', 'QuizResultsTableController')->name('quizresults.get');
    });
    
});