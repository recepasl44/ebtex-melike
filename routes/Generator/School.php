<?php
/**
 * Schools
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Schools'], function () {
        Route::resource('schools', 'SchoolsController');
        //For Datatable
        Route::post('schools/get', 'SchoolsTableController')->name('schools.get');
    });
    
});