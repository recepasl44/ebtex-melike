<?php
/**
 * Quizzes
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Quizzes'], function () {
        Route::resource('quizzes', 'QuizzesController');
        //For Datatable
        Route::post('quizzes/get', 'QuizzesTableController')->name('quizzes.get');
    });
    
});