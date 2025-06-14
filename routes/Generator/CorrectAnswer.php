<?php
/**
 * CorrectAnswers
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'CorrectAnswers'], function () {
        Route::resource('correctanswers', 'CorrectAnswersController');
        //For Datatable
        Route::post('correctanswers/get', 'CorrectAnswersTableController')->name('correctanswers.get');
    });
    
});