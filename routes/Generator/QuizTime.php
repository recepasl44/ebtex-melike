<?php
/**
 * QuizTimes
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'QuizTimes'], function () {
        Route::resource('quiztimes', 'QuizTimesController');
        //For Datatable
        Route::post('quiztimes/get', 'QuizTimesTableController')->name('quiztimes.get');
    });
    
});