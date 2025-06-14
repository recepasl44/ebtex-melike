<?php
/**
 * QuestionDifficults
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'QuestionDifficults'], function () {
        Route::resource('questiondifficults', 'QuestionDifficultsController');
        //For Datatable
        Route::post('questiondifficults/get', 'QuestionDifficultsTableController')->name('questiondifficults.get');
    });
    
});