<?php
/**
 * QuizLevels
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'QuizLevels'], function () {
        Route::resource('quizlevels', 'QuizLevelsController');
        //For Datatable
        Route::post('quizlevels/get', 'QuizLevelsTableController')->name('quizlevels.get');
    });
    
});