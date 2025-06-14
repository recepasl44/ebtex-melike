<?php
/**
 * Books
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Books'], function () {
        Route::resource('books', 'BooksController');
        //For Datatable
        Route::post('books/get', 'BooksTableController')->name('books.get');
    });
    
});