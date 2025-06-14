<?php
/**
 * QuizApplications
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'QuizApplications'], function () {
        Route::resource('quizapplications', 'QuizApplicationsController');
        //For Datatable
        Route::post('quizapplications/get', 'QuizApplicationsTableController')->name('quizapplications.get');
    });
    
});