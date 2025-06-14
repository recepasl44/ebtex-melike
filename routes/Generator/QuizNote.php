<?php
/**
 * QuizNotes
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'QuizNotes'], function () {
        Route::resource('quiznotes', 'QuizNotesController');
        //For Datatable
        Route::post('quiznotes/get', 'QuizNotesTableController')->name('quiznotes.get');
    });
    
});