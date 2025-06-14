<?php
/**
 * Answers
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Answers'], function () {
        Route::resource('answers', 'AnswersController');
        //For Datatable
        Route::post('answers/get', 'AnswersTableController')->name('answers.get');
    });
    
});