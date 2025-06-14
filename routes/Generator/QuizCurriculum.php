<?php
/**
 * QuizCurriculums
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'QuizCurriculums'], function () {
        Route::resource('quizcurriculums', 'QuizCurriculumsController');
        //For Datatable
        Route::post('quizcurriculums/get', 'QuizCurriculumsTableController')->name('quizcurriculums.get');
    });
    
});