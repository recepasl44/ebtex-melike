<?php
/**
 * Conversations
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Conversations'], function () {
        Route::resource('conversations', 'ConversationsController');
        //For Datatable
        Route::post('conversations/get', 'ConversationsTableController')->name('conversations.get');
    });
    
});