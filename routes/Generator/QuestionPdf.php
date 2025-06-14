<?php
/**
 * QuestionPdfs
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'QuestionPdfs'], function () {
        Route::post('questionpdfs/question/save', 'QuestionPdfsController@saveQuestion')->name('questionpdfs.question.save');
        Route::resource('questionpdfs', 'QuestionPdfsController');
        //For Datatable
        Route::post('questionpdfs/get', 'QuestionPdfsTableController')->name('questionpdfs.get');
    });
    
});