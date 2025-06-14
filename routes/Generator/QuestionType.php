<?php
/**
 * QuestionTypes
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'QuestionTypes'], function () {
        Route::resource('questiontypes', 'QuestionTypesController');
        //For Datatable
        Route::post('questiontypes/get', 'QuestionTypesTableController')->name('questiontypes.get');
    });
    
});