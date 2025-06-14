<?php
/**
 * ConversationUsers
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'ConversationUsers'], function () {
        Route::resource('conversationusers', 'ConversationUsersController');
        //For Datatable
        Route::post('conversationusers/get', 'ConversationUsersTableController')->name('conversationusers.get');
    });
    
});