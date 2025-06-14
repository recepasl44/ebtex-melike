<?php
/**
 * Scholarships
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Scholarships'], function () {
        Route::resource('scholarships', 'ScholarshipsController');
        //For Datatable
        Route::post('scholarships/get', 'ScholarshipsTableController')->name('scholarships.get');
    });
    
});