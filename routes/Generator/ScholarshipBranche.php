<?php
/**
 * QuizBranches
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'QuizBranches'], function () {
        Route::resource('quizbranches', 'QuizBranchesController');
        //For Datatable
        Route::post('quizbranches/get', 'QuizBranchesTableController')->name('quizbranches.get');
    });
    
});