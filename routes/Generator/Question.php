<?php
/**
 * Questions
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Questions'], function () {
        Route::get('questions/upload', 'QuestionsController@upload')->name('questions.upload');
        Route::resource('questions', 'QuestionsController');
        //For Datatable
        Route::post('questions/get', 'QuestionsTableController')->name('questions.get');
    });
    
});