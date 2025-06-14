<?php
/**
 * Bulletins
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Bulletins'], function () {
        Route::resource('bulletins', 'BulletinsController');
        //For Datatable
        Route::post('bulletins/get', 'BulletinsTableController')->name('bulletins.get');
    });
    
});