<?php
/**
 * OpticalForms
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'OpticalForms'], function () {
        Route::resource('opticalforms', 'OpticalFormsController');
        //For Datatable
        Route::post('opticalforms/get', 'OpticalFormsTableController')->name('opticalforms.get');
    });
    
});