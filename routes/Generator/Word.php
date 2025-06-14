<?php
/**
 * Cards
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Words'], function () {
        Route::resource('words', 'WordsController');
        //For Datatable
        Route::post('words/get', 'WordsTableController')->name('words.get');
    });
    
});