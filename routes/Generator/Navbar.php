<?php
/**
 * Navbars
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Navbars'], function () {
        Route::resource('navbars', 'NavbarsController');
        //For Datatable
        Route::post('navbars/get', 'NavbarsTableController')->name('navbars.get');
    });
    
});