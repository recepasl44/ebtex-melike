<?php
/**
 * Levels
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Levels'], function () {
        Route::resource('levels', 'LevelsController');
        //For Datatable
        Route::post('levels/get', 'LevelsTableController')->name('levels.get');
    });
    
});