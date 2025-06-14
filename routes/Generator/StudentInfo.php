<?php
/**
 * StudentInfos
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'StudentInfos'], function () {
        Route::resource('studentinfos', 'StudentInfosController');
        //For Datatable
        Route::post('studentinfos/get', 'StudentInfosTableController')->name('studentinfos.get');
    });
    
});