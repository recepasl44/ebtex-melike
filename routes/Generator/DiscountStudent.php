<?php
/**
 * DiscountStudents
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'DiscountStudents'], function () {
        Route::resource('discountstudents', 'DiscountStudentsController');
        //For Datatable
        Route::post('discountstudents/get', 'DiscountStudentsTableController')->name('discountstudents.get');
    });
    
});