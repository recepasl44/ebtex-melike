<?php
/**
 * Contacts
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Contacts'], function () {
        Route::resource('contacts', 'ContactsController');
        //For Datatable
        Route::post('contacts/get', 'ContactsTableController')->name('contacts.get');
    });
    
});