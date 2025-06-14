<?php
/**
 * Models
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Models'], function () {
        Route::resource('models', 'ModelsController');
        //For Datatable
        Route::post('models/get', 'ModelsTableController')->name('models.get');
    });
    
});