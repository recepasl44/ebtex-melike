<?php
/**
 * Cards
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Cards'], function () {
        Route::resource('cards', 'CardsController');
        //For Datatable
        Route::post('cards/get', 'CardsTableController')->name('cards.get');
    });
    
});