<?php
/**
 * Agreements
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Agreements'], function () {
        Route::resource('agreements', 'AgreementsController');
        //For Datatable
        Route::post('agreements/get', 'AgreementsTableController')->name('agreements.get');
    });
    
});