<?php
/**
 * FieldManagers
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'FieldManagers'], function () {
        Route::resource('fieldmanagers', 'FieldManagersController');
        //For Datatable
        Route::post('fieldmanagers/get', 'FieldManagersTableController')->name('fieldmanagers.get');
    });
    
});