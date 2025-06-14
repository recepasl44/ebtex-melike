<?php
/**
 * Tests
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Tests'], function () {
        Route::resource('tests', 'TestsController');
        //For Datatable
        Route::post('tests/get', 'TestsTableController')->name('tests.get');
    });
    
});