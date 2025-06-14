<?php
/**
 * Messages
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Messages'], function () {
        Route::resource('messages', 'MessagesController');
        //For Datatable
        Route::post('messages/get', 'MessagesTableController')->name('messages.get');
    });
    
});