<?php
/**
 * SchoolCategories
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'SchoolCategories'], function () {
        Route::resource('schoolcategories', 'SchoolCategoriesController');
        //For Datatable
        Route::post('schoolcategories/get', 'SchoolCategoriesTableController')->name('schoolcategories.get');
    });
    
});