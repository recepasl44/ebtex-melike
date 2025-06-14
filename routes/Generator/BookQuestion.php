<?php
/**
 * BookQuestions
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'BookQuestions'], function () {
        Route::resource('bookquestions', 'BookQuestionsController');
        //For Datatable
        Route::post('bookquestions/get', 'BookQuestionsTableController')->name('bookquestions.get');
    });
    
});