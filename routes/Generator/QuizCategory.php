<?php
/**
 * QuizCategories
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'QuizCategories'], function () {
        Route::resource('quizcategories', 'QuizCategoriesController');
        //For Datatable
        Route::post('quizcategories/get', 'QuizCategoriesTableController')->name('quizcategories.get');
    });
    
});