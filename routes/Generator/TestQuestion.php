<?php
/**
 * TestQuestions
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'TestQuestions'], function () {
        Route::resource('testquestions', 'TestQuestionsController');
        //For Datatable
        Route::post('testquestions/get', 'TestQuestionsTableController')->name('testquestions.get');
    });
    
});