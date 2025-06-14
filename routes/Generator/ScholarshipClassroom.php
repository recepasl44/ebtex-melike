<?php
/**
 * QuizClassrooms
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'QuizClassrooms'], function () {
        Route::resource('quizclassrooms', 'QuizClassroomsController');
        //For Datatable
        Route::post('quizclassrooms/get', 'QuizClassroomsTableController')->name('quizclassrooms.get');
    });
    
});