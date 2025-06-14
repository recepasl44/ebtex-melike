<?php
/**
 * QuizTypes
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'QuizTypes'], function () {
        Route::resource('quiztypes', 'QuizTypesController');
        //For Datatable
        Route::post('quiztypes/get', 'QuizTypesTableController')->name('quiztypes.get');
    });
    
});