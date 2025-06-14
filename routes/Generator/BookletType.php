<?php
/**
 * BookletTypes
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'BookletTypes'], function () {
        Route::resource('booklettypes', 'BookletTypesController');
        //For Datatable
        Route::post('booklettypes/get', 'BookletTypesTableController')->name('booklettypes.get');
    });
    
});