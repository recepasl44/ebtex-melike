<?php
/**
 * Components
 *
 */
Route::group(['namespace' => 'Backend', 'prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    
    Route::group( ['namespace' => 'Components'], function () {
        Route::resource('components', 'ComponentsController');
        //For Datatable
        Route::post('components/get', 'ComponentsTableController')->name('components.get');
    });
    
});