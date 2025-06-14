<?php
/**
 * OpticalAttributes
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'OpticalAttributes'], function () {
        Route::resource('opticalattributes', 'OpticalAttributesController');
        //For Datatable
        Route::post('opticalattributes/get', 'OpticalAttributesTableController')->name('opticalattributes.get');
    });
    
});