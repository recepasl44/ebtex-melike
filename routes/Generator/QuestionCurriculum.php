<?php
/**
 * QuestionCurriculums
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'QuestionCurriculums'], function () {
        Route::resource('questioncurriculums', 'QuestionCurriculumsController');
        //For Datatable
        Route::post('questioncurriculums/get', 'QuestionCurriculumsTableController')->name('questioncurriculums.get');
    });
    
});